---
id: basic_setsmartcontractenvironment
title: Basic - How to use C# to write a QURAS smart contract
---

We currently recommend C# for developing smart contracts.

This section contains a short tutorial that guides you in configuring the C# development environment for QURAS smart contracts. It also gives you an idea of ​​how to create a smart contract project and how to compile it.

## Development Tools

### 1. Visual Studio 2017

If you have already installed Visual Studio 2017 on your computer and checked for .NET Cross-Platform Development at the time of installation, you can skip this section.

Download and install: [`Visual Studio download address`](https://visualstudio.microsoft.com/vs/community/) <br/>

The installation process is very simple, just follow the operation prompts step-by-step. It should be noted that you need to check the installation of .NET Core cross-platform development, otherwise you will not be able to open quras-vm project in step #3. The installation takes about ten minutes or up to an hour.

<center>![/quras-js/img](/quras-js/img/smartcontract/install_core_cross_platform_development_toolset.png)</center>

### 2. QurasContractPlugin

<p>Installation method:</p>

<p>Open Visual Studio 2017, open Tools, click on Extensions and Updates, click on the Online tab on the left side of the window, search QURAS in the search box on the top right corner of the window, download the QurasContractPlugin (this step requires internet access).</p>

<center>![/quras-js/img](/quras-js/img/smartcontract/install_quras_plugin.png)</center>

### 3. quras-compiler

Installation and configuration steps:<br/>
Download the [`quras-compiler`](https://bitbucket.org/qurasdev/quras-sc-compiler/src/master/) project on Github, open the solution with Visual Studio 2017, and publish the QURAS project

<center>![/quras-js/img](/quras-js/img/smartcontract/quras_compiler_setting.png)</center>

After the release is successful, the quras-msil-compile.exe file is generated in bin\Release\PublishOutput.

We now need to add this directory to our execution path. The PATH is the system variable that your operating system uses to locate needed executables from the command line or Terminal window.

#### Windows 10

<b>In Search, search for and then select: System (Control Panel) Click the Advanced system settings link. Click Environment Variables. In the section System Variables, find the PATH environment variable and select it. Click Edit. If the PATH environment variable does not exist, click New. In the Edit System Variable (or New System Variable) window, specify the value of the PATH environment variable. Click OK. Close all remaining windows by clicking OK.</b>

Now run Command or PowerShell, and enter quras-msil-compile.exe. If there is no error and the output shows the version number (as shown), then the environment variable configuration is successful.

<center>![/quras-js/img](/quras-js/img/smartcontract/quras_compiler_run.png)</center>

## Create project

After the above installation configuration is successful, you can create a QurasContract project in Visual Studio 2017.

<center>![/quras-js/img](/quras-js/img/smartcontract/quras_sc_create_project.png)</center>

Once you create a project, it will automatically generate a C# file. The default class which inherits the SmartContract is shown in the following:

<center>![/quras-js/img](/quras-js/img/smartcontract/quras_sc_code.png)</center>

## Compile the project

Everything is now ready to add the entry method that defines the smart contract:

After you compile it successfully you will see Contract1.avm in the bin/Debug directory, which is the file that is generated as the QURAS smart contract.

<center>![/quras-js/img](/quras-js/img/smartcontract/quras_sc_compile.png)</center>

Now that you have completed the configuration of the Quras smart contract development environment.