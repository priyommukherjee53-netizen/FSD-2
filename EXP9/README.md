# CI/CD Demo – Spring Boot, Docker, GitHub Actions, Canary

One project covering both experiments:

| Experiment | What implements it |
|---|---|
| **CI pipeline** (build + test automation) | `.github/workflows/ci.yml` |
| Unit testing (JUnit 5 + Mockito) | `src/test/.../service/ProductServiceTest` |
| Web-layer testing (MockMvc) | `src/test/.../controller/ProductControllerTest` |
| Integration testing (Testcontainers + PostgreSQL) | `src/test/.../integration/ProductApiIntegrationTest` |
| Contract testing (Pact) | `src/test/.../contract/ProductConsumerPactTest` + `ProductProviderPactTest` |
| **CD pipeline** (containerize + deploy) | `Dockerfile`, `.github/workflows/cd.yml` |
| Canary deployment | `k8s/` (Kubernetes, 9 stable : 1 canary pods) and `canary/` (local Docker demo, nginx 90/10) |

## Prerequisites
JDK 17+, Maven 3.9+ (or run `mvn wrapper:wrapper` once to create `mvnw`), Docker Desktop (needed for Testcontainers and the Docker steps), Git.
VS Code: open the folder and install the recommended extensions when prompted.

## Run locally
```bash
mvn spring-boot:run          # app on http://localhost:8080 (H2 in-memory DB)
```
Try the endpoints from `api.http` (REST Client extension) or:
```bash
curl -X POST localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Laptop","price":999.99}'
curl localhost:8080/api/products
```

## Run all tests
```bash
mvn clean verify
```
Order of events: unit tests → MockMvc tests → Testcontainers integration test (starts a real PostgreSQL; skipped if Docker is off) → Pact consumer test (writes `target/pacts/product-frontend-product-service.json`) → Pact provider verification (replays that contract against the backend).
Tests run alphabetically on purpose so the consumer pact is generated before the provider verifies it.
If you run the provider test alone from VS Code, run `ProductConsumerPactTest` first.

## Docker
```bash
docker build -t ci-cd-demo .
docker run -p 8080:8080 ci-cd-demo
curl localhost:8080/actuator/health
```

## Local canary demo (no Kubernetes)
```bash
cd canary
docker compose up --build
./test-canary.sh        # Windows PowerShell: ./test-canary.ps1
```
Expected: roughly 45 responses `1.0.0-stable` and 5 `2.0.0-canary`. Edit `weight=` in `canary/nginx.conf` to widen the rollout (e.g. 5/5 = 50%).

## Upload to GitHub
```bash
git init
git add .
git commit -m "CI/CD pipeline demo"
git branch -M main
git remote add origin https://github.com/<your-username>/ci-cd-demo.git
git push -u origin main
```
Open the **Actions** tab to watch the pipeline run.

### Secrets (Settings → Secrets and variables → Actions)
| Secret | Purpose | Required? |
|---|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub user | to push the image |
| `DOCKERHUB_TOKEN` | Docker Hub access token | to push the image |
| `KUBE_CONFIG` | base64 of your kubeconfig (`base64 -w0 ~/.kube/config`) | only for real cluster deployment |

Without these the pipeline still runs: it tests, builds and smoke-tests the image, and prints what it *would* deploy.
For a manual approval gate before full rollout, create an environment named **production** (Settings → Environments) and add required reviewers.

## Pipeline flow (cd.yml, on push to `main`)
1. **ci** – reuse ci.yml (all tests must pass)
2. **build-and-push** – build image, smoke-test the container, push to Docker Hub (`:sha` and `:latest`)
3. **deploy-canary** – new version on 1 of 10 pods (~10% traffic), observe 60 s, auto-rollback on failure
4. **promote** – after approval, roll the new image to all stable pods and remove the canary

## Notes
- The app uses in-memory H2 by default, so each replica has its own data; fine for a demo, switch to a shared database for real use.
- Branches other than `main` and pull requests run CI only; deployment happens only from `main`.
