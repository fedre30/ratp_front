![alt text](https://www.bluecieloecm.com/wp-content/uploads/2016/03/RATP-logo.jpg)

# Tube 🚇

Tube is a Datavisualization based on RATP Open Data.

## Description 📖

**What's RATP?**
RATP is a state-owned public transport operator and maintainer headquartered in Paris, France, which includes underground, tramway, bus and RER.
Only Underground and RER were used for this project.

**Why a Dataviz?**

It is acknowledged that too much data can be confusing and very hard to read, so making every information easier to understand and more interactive for user was the main core of this project.
Sometimes colors, shapes, animations and graphics can be much more attractive than plain datatables.

## Features 🛠

### Criteria

In order to show every station's quality standard, 4 criteria were taken in account, such as:

- Air pollution
- Traffic informations
- Toilets
- Accessibility

### Map 🗺

The interactive map representing our main data was created using [React Simple Maps](https://www.react-simple-maps.io), a React component based on [D3](https://d3js.org).
All criteria have a sub-criteria which allows a deeper and more precise research through data.

## API 🗂

Frontend app was developed on React, but all data are fetched by an API built in Symfony.
Here the link to API repository: [Tube API](https://github.com/vinicel/api_ratp)

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Team 👩🏻‍💻👨🏽‍💻

- Federica Alfano
- Mathieu Blok
- Guillaume Cornet
- Andy Dodakal
- Enzo Hespel
