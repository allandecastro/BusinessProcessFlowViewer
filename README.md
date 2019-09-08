# BusinessProcessFlowViewer
 
Here is my second Power Apps Component using PowerApps Component framework!
## Purpose

This component displays BPFs with all process stages of entities from a grid/views. 

Support any entities (OOB and custom) and any BPF (OOB and custom).

## Screenshot
![alt text](https://github.com/allandecastro/BusinessProcessFlowViewer/blob/master/BusinessProcessFlowViewer.gif?raw=true)




# Installation

You can find the managed solution into ./Deployment/ folder.

Then you must follow these steps:

* Import the solution into your target environment.

* Open a form where you added a subgrid

* Click to managed properties of the subgrid, and add the custom Control "BusinessProcessFlowViewer"

* You can see that they are severals parameters (with default values), it allows you to change color and to configure the component properly.You can refer to the configuration section.

## Configuration

This is the list of parameters that can be set on the control

|Parameter|Description|Required|Example|
|---------|-----------|:----:|:---:|
|**parametersBPF**|Attribute to use as label for the checkbox|X|"{"bpfs":[{"bpfEntitySchemaName":"opportunitysalesprocess","lookupFieldSchemaName":"_opportunityid_value"},  {"bpfEntitySchemaName":"leadtoopportunitysalesprocess","lookupFieldSchemaName":"_opportunityid_value"}]}|
|**completedColor**|This Hex Color define the background color of the completed stages.|X|#090|
|**completedTextColor**|This Hex Color define the  text color of the completed stages.|X|#090|
|**activeColor**|This Hex Color define the background color of the active stage.|X|#777|
|**activeTextColor**|This Hex Color define the text color of the active stage.|X|#2183DD|
|**notActiveColor**|This Hex Color define the background color of the not active stages.|X|#DFE3E4|
|**notActiveTextColor**|This Hex Color define the text color of the not active stages.|X|#666666|
|**progressTrackLineColor**|This Hex Color define the background color of the progress line.|X|#DFE3E4|
|**pulseColorr**|This Hex Color define the background color of the progress line.||#95c6e6|
|**displayEntityName**|This value is used to display or not the name of the entity.||true|

### Configuration Example

Here are some examples with different parameters:

# Package a component
## Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
## Build the control

* Clone the repo/ download the zip file.
* Navigate to ./BusinessProcessFlowViewer/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
## Build the solution

* Create a new solution folder (eg. SolutionFolder) and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisher-name someName --publisher-prefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:build /restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
