# Features_Flicks
Overview
Feature Flicks is a small cinema located in Småstad, Sweden. The company aims to compete with larger competitors in the area by creating a prototype website that allows visitors to get information about movies being shown, including dates and times, and book tickets.

This repository contains the frontend code for the prototype website, built using React, React Router, and React Bootstrap. The backend REST API and MySQL have already been provided by another company and should be integrated into the frontend.

Components
To create the website, the following components have been implemented:

Header: This component displays the company logo and navigation menu, allowing visitors to access different pages of the website.

Movies: This component displays a list of movies being shown at the cinema, including the movie poster, title, and length in hours and minutes. Visitors can filter this list by category.

Screenings: This component displays a list of screenings for each movie, sorted by date and time. Each screening includes the date and time, movie poster, title, and length. Visitors can filter this list by category.

ScreeningDay: This component displays the date and weekday for each screening day.

ScreeningMovie: This component displays the details for each screening, including the date and time, movie poster, title, and length.

Booking: This component allows visitors to select the number of adjacent seats they wish to book for a specific screening. Visitors can also choose the number of visitors, see the total price, and receive a unique booking number.

Seat: This component displays a graphic view of the seats. Visitors can select the seats they wish to book.

Spinner: This component displays a loading spinner when data is being fetched from the backend.

GlobalState: This component manages the state for the entire website.

Welcome: Welcome page
