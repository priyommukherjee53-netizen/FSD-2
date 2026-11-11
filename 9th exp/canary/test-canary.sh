#!/usr/bin/env bash
# Sends 50 requests and counts which version answered.
for i in $(seq 1 50); do
  curl -s http://localhost:8080/api/version
  echo
done | sort | uniq -c
