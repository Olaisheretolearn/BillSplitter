# Bill Splitter Deluxe

`Bill Splitter Deluxe` is a handy web-based tool for friends or colleagues looking to split their bills effortlessly. Ever been in a situation where multiple people have paid for different items, and now you need to ensure everyone gets reimbursed fairly? Then this is the tool for you!

## Features

- **Add Items**: Enter the item, payer, and amount paid.
- **Calculate Splits**: Figure out who owes who, at a click of a button.
- **Explain Payments**: Receive detailed explanations for each reimbursement.
- **Share Calculations**: Create a shareable link containing your bill details.

## Usage

1. **Adding an Item**:
   - Input the name of the item, the payer, and the amount.
   - Click on `Add Item` to add it to the list.

2. **Splitting the Bill**:
   - Input the total number of people involved.
   - Click on `Split Bill` to receive a list of transactions. For example, "Alice needs to pay $20 to Bob."

3. **Explaining the Payments**:
   - Click on any list item under the results to get an explanation of why that particular payment is needed.

4. **Sharing Your Calculations**:
   - Click `Share Calculation` to generate a shareable link containing all the bill details, which can be easily shared with others!

5. **Loading a Previous Calculation**:
   - Load the shared link in your browser, and the tool will automatically populate all bill details for you.

## Code Overview

The provided JavaScript code integrates smoothly with HTML. It collects input values, performs calculations, and dynamically presents results on the webpage. It extensively uses event listeners to handle button clicks and other user actions.

## Getting Started

1. Include the provided JavaScript code in your HTML project.
2. Design your HTML to include the necessary input fields (`item`, `payer`, `item-amount`, `people`) and buttons (`add-item`, `split-bill`, `share-calculation`).
3. Create `ul` elements (`item-ul` and `result-ul`) to display the items and results.

## Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

Your feedback matters! If you find this tool useful or have any suggestions for improvements, feel free to contribute to the code or drop a note. Your input helps make the tool better for everyone!
