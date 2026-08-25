# Admin API smoke tests (Phase 6)
# Run with backend on :8002:  powershell -File scripts/admin-smoke.ps1

$ErrorActionPreference = "Stop"
$base = if ($env:API_BASE) { $env:API_BASE } else { "http://127.0.0.1:8002" }

Write-Host "Using API $base"

$login = Invoke-RestMethod -Method Post -Uri "$base/api/admin/login" -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
$token = $login.token
$headers = @{ Authorization = "Bearer $token" }

# --- Test 1: Package create → list → update → delete ---
$createBody = @{
  title = "Smoke Test Package"
  tagline = "Automated"
  destination = "Goa"
  category = "domestic"
  duration = "2N / 3D"
  stays = "Hotel"
  guests = "2 Adults"
  highlights = @("Beach")
  itinerary = @("Day 1")
  price = 9999
  priceNote = "per person"
  negotiable = $true
  imageUrl = "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800"
  pdfUrl = ""
  eventDate = $null
  featured = $false
  sortOrder = 100
  active = $true
} | ConvertTo-Json -Depth 5

$created = Invoke-RestMethod -Method Post -Uri "$base/api/admin/packages" -Headers $headers -ContentType "application/json" -Body $createBody
$list = Invoke-RestMethod -Method Get -Uri "$base/api/admin/packages" -Headers $headers
if (-not ($list | Where-Object { $_.id -eq $created.id })) { throw "Test1 FAIL: not listed" }

$upd = $createBody | ConvertFrom-Json
$upd.title = "Smoke Test Package Updated"
$upd.active = $false
$updated = Invoke-RestMethod -Method Put -Uri "$base/api/admin/packages/$($created.id)" -Headers $headers -ContentType "application/json" -Body ($upd | ConvertTo-Json -Depth 5)
if ($updated.title -ne "Smoke Test Package Updated") { throw "Test1 FAIL: update" }

Invoke-RestMethod -Method Delete -Uri "$base/api/admin/packages/$($created.id)" -Headers $headers | Out-Null
$list2 = Invoke-RestMethod -Method Get -Uri "$base/api/admin/packages" -Headers $headers
if ($list2 | Where-Object { $_.id -eq $created.id }) { throw "Test1 FAIL: delete" }
Write-Host "PASS Test1 package CRUD ($($created.id))"

# --- Test 2: Public enquiry → admin status update ---
$enq = Invoke-RestMethod -Method Post -Uri "$base/api/enquiries" -ContentType "application/json" -Body (@{
  name = "Smoke Tester"
  email = "smoke@test.example"
  phone = "9000000000"
  message = "Status flow"
  travelers = 2
} | ConvertTo-Json)

$enq2 = Invoke-RestMethod -Method Post -Uri "$base/api/admin/enquiries/$($enq.id)/status" -Headers $headers -ContentType "application/json" -Body '{"status":"CLOSED"}'
if ($enq2.status -ne "CLOSED") { throw "Test2 FAIL: status" }
Write-Host "PASS Test2 enquiry status ($($enq.id))"

$stats = Invoke-RestMethod -Method Get -Uri "$base/api/admin/stats" -Headers $headers
Write-Host "PASS stats totalBookings=$($stats.totalBookings)"
Write-Host "ALL_PASSED"
