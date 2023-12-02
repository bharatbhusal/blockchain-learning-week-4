// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

//Ownership control of the product.
contract Ownable {
    //mapping storing the owner of given product id.
    mapping(uint256 => mapping(address => bool)) public OWNER;

    // modifier to restrict actions to product owner only.
    modifier onlyOwner(uint256 productId) {
        require(OWNER[productId][msg.sender], "Not Owner");
        _;
    }
}

//Seller role control of the user.
contract Sellable {
    //assigning seller role to users.
    mapping(address => bool) public SELLER;

    modifier onlySeller(address user) {
        require(SELLER[user], "Not a Seller");
        _;
    }
}

// Main contract inheriting Ownable contract.
contract ProductSupplyChain is Ownable, Sellable {
    address public administrator; //owner of the contract.

    //mapping productID to product struct.
    mapping(uint256 => Product) public STORAGE;

    // Product struct with properties like productId, name, currentOwner, price, and state.
    struct Product {
        uint256 productId; //ID starting from 1.
        string name;
        address currentOwner;
        uint256 price;
    }
    // event to emit when new product is created.
    event ProductCreated(uint256 indexed productId, address indexed owner);
    // event to emit when product is sold.
    event ProductSold(
        uint256 indexed productId,
        address from,
        address to,
        uint256 price
    );
    //event to emit when the owner is changed - product is sold.
    event OwnershipTransferred(
        uint256 productId,
        address indexed previousOwner,
        address indexed newOwner
    );

    event SellerAssigned(address);

    //modifier to restrict actions only to contract owner.
    modifier onlyAdministrator() {
        require(msg.sender == administrator, "Not Administrator");
        _;
    }

    //modifier to make sure specified product exists.
    modifier uniqueProductExists(uint256 productId) {
        require(STORAGE[productId].productId != 0, "Product does not exist");
        require(
            STORAGE[productId].productId != productId,
            "Product already exists"
        );
        _;
    }

    modifier onlyValidAddress(address user) {
        require(user != address(0), "Invalid newOwner address"); //validity of the address.
        _;
    }

    //constructor of main contract.
    constructor() {
        administrator = msg.sender; //assigning ownership of contract to the constructor caller.
    }

    function assignSellerRole(
        address seller
    ) public onlyAdministrator onlyValidAddress(seller) {
        SELLER[seller] = true;

        emit SellerAssigned(seller);
    }

    // function to transfer ownership.
    function transferOwnership(
        address newOwner,
        uint256 _productId
    )
        private
        onlyValidAddress(newOwner)
        onlySeller(newOwner)
        onlyOwner(_productId)
    {
        OWNER[_productId][newOwner] = true; //adding the owner of the product in mapping.
        delete OWNER[_productId][msg.sender];
        STORAGE[_productId].currentOwner = newOwner;

        emit OwnershipTransferred(_productId, msg.sender, newOwner); //emiting event to signal ownership transfer.
    }

    // function to create a new product.
    function createProduct(
        uint256 _productId,
        string memory _name,
        uint256 _price
    ) public onlySeller(msg.sender) uniqueProductExists(_productId) {
        //creating a new product struct with input values.
        Product memory newProduct = Product({
            productId: _productId,
            name: _name,
            currentOwner: msg.sender,
            price: _price
        });

        STORAGE[_productId] = newProduct; //registering new product in storage.
        OWNER[_productId][msg.sender] = true; //adding owner-product relation in Owner mapping.

        emit ProductCreated(_productId, msg.sender); //emiting event to signal new product creation.
    }

    //function to sell a product.
    function sellProduct(
        uint256 _productId,
        address _to,
        uint256 _price
    )
        public
        onlyValidAddress(_to)
        uniqueProductExists(_productId)
        onlyOwner(_productId)
    {
        delete OWNER[_productId][msg.sender]; //deleting previous owner of the product.
        OWNER[_productId][_to] = true; //updating new owner of the product - buyer.
        STORAGE[_productId].currentOwner = _to; //changing owner in storage.

        emit ProductSold(_productId, msg.sender, _to, _price); //emiting event to signal selling of the product
    }

    function getProductDetail(
        uint256 _productId
    ) public view returns (Product memory) {
        return STORAGE[_productId];
    }
}
