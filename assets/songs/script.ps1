# Set the folder path where the .png files are located
$folderPath = ".\"

# Get all .png files in the folder
$pngFiles = Get-ChildItem -Path $folderPath -Filter *.png

# Create a hashtable to store the image sources
$imageSources = @{}

# Iterate through each .png file and organize them in the hashtable
foreach ($pngFile in $pngFiles) {
    $fileName = $pngFile.BaseName
    $parts = $fileName -split '_'

    # Check if the file name has an underscore
    if ($parts.Count -gt 1) {
        $groupKey = $parts[0]
        $imageKey = $parts[1]
    } else {
        $groupKey = $fileName
        $imageKey = $fileName
    }

    # Add the image source to the hashtable
    if (-not $imageSources.ContainsKey($groupKey)) {
        $imageSources[$groupKey] = @()
    }

    $imageSources[$groupKey] += "require(`"./$($pngFile.BaseName)`")"
}

# Convert the hashtable to a JSON-like string
$jsonString = $imageSources | ConvertTo-Json -Depth 5

# Create the content for the .js file
$jsContent = "export const imageSources = $jsonString"

# Specify the path for the output .js file
$outputFilePath = ".\file.js"

# Write the content to the .js file
$jsContent | Out-File -FilePath $outputFilePath -Force -Encoding UTF8

Write-Host "Image sources exported to $outputFilePath"