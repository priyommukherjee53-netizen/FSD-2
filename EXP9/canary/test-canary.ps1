# Windows PowerShell version: sends 50 requests and counts which version answered.
1..50 | ForEach-Object { (Invoke-RestMethod http://localhost:8080/api/version).version } |
  Group-Object | Select-Object Count, Name
