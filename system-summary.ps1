[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# A compact local report; no network calls, machine names, or user identifiers.
[ordered]@{
    OperatingSystem = [System.Runtime.InteropServices.RuntimeInformation]::OSDescription
    Architecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
    LogicalProcessors = [System.Environment]::ProcessorCount
    PowerShellVersion = $PSVersionTable.PSVersion.ToString()
} | ConvertTo-Json
