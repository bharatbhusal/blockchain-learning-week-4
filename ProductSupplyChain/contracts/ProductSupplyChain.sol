// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;
import "./Ownable.sol";
import "./Sellable.sol";

//interface of external contract
interface OnlyAdministratorCheckerInterface {
    function isAdmin(address administrator) external returns (bool); //function to check admin role.
}

// Main contract inheriting Ownable contract.
contract ProductSupplyChain is Ownable, Sellable {
    address public administrator; //owner of the contract.
    OnlyAdministratorCheckerInterface public OnlyAdministratorChecker; //External contract instance.

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
    event ProductCreated(
        uint256 indexed productId,
        address indexed owner,
        uint256 price
    );
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

    //event to emit when seller role is assigned.
    event SellerAssigned(address indexed seller);

    //modifier to make sure specified product exists.
    modifier productExists(uint256 productId) {
        require(STORAGE[productId].productId != 0, "Product does not exist");
        _;
    }

    //modifier to make sure product already exists.
    modifier onlyNewProduct(uint256 productId) {
        require(STORAGE[productId].productId == 0, "Product already exists");
        _;
    }

    //modifier to make sure user address is valid.
    modifier onlyValidAddress(address user) {
        require(user != address(0), "Invalid address");
        _;
    }

    //constructor of main contract.
    constructor(address onlyAdministratorChecker) {
        administrator = msg.sender; //assigning ownership of contract to the constructor caller.
        //create the instance of external contract.
        OnlyAdministratorChecker = OnlyAdministratorCheckerInterface(
            onlyAdministratorChecker
        );
    }

    //function to assign seller role to user with valid address.
    function assignSellerRole(address seller) public onlyValidAddress(seller) {
        //only administrator can assign.
        require(
            OnlyAdministratorChecker.isAdmin(administrator),
            "Not Administrator"
        );
        //updating SELLER mapping
        SELLER[seller] = true;

        //emiting seller assignmnet action.
        emit SellerAssigned(seller);
    }

    // function to transfer ownership.
    function transferOwnership(
        address newOwner,
        uint256 _productId
    )
        private
        onlyValidAddress(newOwner) //newOwner should have valid adderss.
        onlySeller(newOwner) //newOwner should be seller.
        onlyOwner(_productId) //this function caller should be the owner of the product id.
    {
        OWNER[_productId][newOwner] = true; //adding the owner of the product in mapping.
        delete OWNER[_productId][msg.sender]; //deleting the old owner of the product.
        STORAGE[_productId].currentOwner = newOwner; //storing new owner in STORAGE mapping.

        //emitting ownership transfer action.
        emit OwnershipTransferred(_productId, msg.sender, newOwner);
    }

    // function to create a new product.
    function createProduct(
        uint256 _productId,
        string memory _name,
        uint256 _price
    ) public onlySeller(msg.sender) onlyNewProduct(_productId) {
        //product creator should be seller and product id should unique
        //creating a new product struct with input values.
        Product memory newProduct = Product({
            productId: _productId,
            name: _name,
            currentOwner: msg.sender,
            price: _price
        });

        STORAGE[_productId] = newProduct; //registering new product in storage.
        OWNER[_productId][msg.sender] = true; //adding owner-product relation in Owner mapping.

        //emiting event to signal new product creation.
        emit ProductCreated(_productId, msg.sender, _price);
    }

    //function to sell a product.
    function sellProduct(
        uint256 _productId,
        address _to,
        uint256 _price
    )
        public
        onlyValidAddress(_to)
        productExists(_productId)
        onlySeller(_to)
        onlyOwner(_productId)
    {
        transferOwnership(_to, _productId); //transfering the ownership of product from seller to buyer.

        emit ProductSold(_productId, msg.sender, _to, _price); //emiting event to signal selling of the product
    }

    //function to get the detail of product
    function getProductDetail(
        uint256 _productId
    ) public view productExists(_productId) returns (Product memory) {
        //product should exist in STORAGE.
        return STORAGE[_productId];
    }
}
