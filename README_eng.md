
# AuraKirjat 1.0

AuraKirjat is a book e-commerce application implemented as a group work (Scrum) in [TypeScript training organized by Buutti Education] (https://buuttiedu.com/tyonhakijalle/buutcamp-sprint-typescript/).

![database diagram](client/public/images/front-page.png)

## AuraBooks functionalities:

The user can browse the books for sale in the application without registering / logging in to the application.

In the app, books can be browsed by genre (genre), which appear on the left side of the app.
You can also search for books in the “Search by Book or Author” search box at the top of the screen, either in full or in part, so that the app displays all books found with the given character combination.


### Registration / Login:

If a user wishes to order books for sale in the application, he must first register as a user of the application by providing a name, email address as a username, and an optional password of at least five characters.

The user will then need to log in with the email address and password provided above to access the books.

The profile icon allows the user to view and maintain their own information.
Likewise to see their own order history.

### Ordering books:

The “Add to Cart” button next to the book allows the user to add books to their own cart. The contents of the shopping cart appear on the right side of the screen each time books are added to the shopping cart.
Books in the shopping cart can be deleted with the trash can icon there.

Once the user has picked up the desired books in the shopping cart, where by pressing the “Checkout” button, the application will go to a page where the user can enter the delivery address with postcode. The order can then be sent to the online store with the “ORDER” button for delivery processing.

### Checking out:
You can log out of the application with the “Log out” button.


## Technologies used

Programming language:
• TypeScript

User Interface Library:
• React

Defining UI styles:
• CSS

Runtime environment:
• Node.js

Database:
• PostgreSQL
• pgAdmin

Database processing in the program:
• TypeORMTietokannan kuvaus:
•	dbdiagram.io

![database diagram](client/public/images/database_diagram.JPG)

Software development tools:
• Visual Studio Code
• ESLint

Version control:
• Git (Lab)

## Installing the application:

The source code of the application can be copied from GitLab (the path will change).
https://gitlab.com/buutcampsprint/typescript2020/project-yellow

The application itself is then created by running the npm install commands in the project subdirectories / server and / client

## To launch the application:

In the Server directory:
npm run watch

In the Client directory:
npm start


## Further development needs:

Discount code processing in cash operations.

Admin functions: maintenance functions for books, genres and discount codes via the user interface.

Check the balance of the book for sale when placing an order.
Change in book balance on order acceptance.

Offering the option to add products to the shopping cart even for a non-logged-in user.

User interface in english.
