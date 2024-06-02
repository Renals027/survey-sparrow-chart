# Project Title

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction
A bar chart app. That plots the data of the given chart 

## Features
| Feature       | Description                             |
| ------------- | --------------------------------------- |
| Regenerate    | This creates a new set of array of input |


## Installation
```bash
npm run dev
```

## Usage
The app automatically loads the Bar Chart. The Data can be passed dynamically. The regenarate function creates a new set of data for ploting the graph

--Extra Add-on Props:
* X-axis data can be dynamically given
* Y-axis plots can be modified by 10s or 20s based on the props:"yAxisSize" [small|large]
* The Size of the bar can also be modified based on the props:"barSize [small|medium|large]
* If the avarage of the data fed is in hundreds or thousands the y-axis modifies according to that 
* The Y-axis and the X-axis label can also be given as props 