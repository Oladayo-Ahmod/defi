const { ethers } = require('hardhat')
const {getWeth,AMOUNT} = require('../scripts/weth')
async function main(){
    await getWeth()
    const [deployer] = await ethers.getSigners()
    const lending_Pool = await getLendingPool(deployer)
    console.log(`lending pool contract address is ${lending_Pool.address}`);

    const wethTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    await approveErc20(wethTokenAddress,lending_Pool.address,AMOUNT,deployer)
    console.log('-------deposting--------');
    await lending_Pool.deposit(wethTokenAddress,AMOUNT,deployer.address,0)
    console.log('--------deposited---------');

    // borrow
     await userBorrowingData(lending_Pool,deployer.address)
     await daiEthPrice()
    // console.log(availableBorrowsETH,totalDebtETH);
}

// retrieve dai/eth price
async function daiEthPrice(){
    const daiEthPriceFeed = await ethers.getContractAt('AggregatorV3Interface','0x773616E4d11A78F511299002da57A0a94577F1f4')
    const price = await daiEthPriceFeed.latestRoundData()
    console.log(price);
}

// retrieve user borrowing data
async function userBorrowingData(lending_Pool,account){
    const {
        totalCollateralETH,
        totalDebtETH,
        availableBorrowsETH
    } = await lending_Pool.getUserAccountData(account)
    console.log(`total deposited : ${totalCollateralETH}`);
    console.log(`total debt : ${totalDebtETH}`);
    console.log(`available to borrow ${availableBorrowsETH}`);
    return {totalCollateralETH,totalDebtETH,availableBorrowsETH}
}


async function getLendingPool(account){
    const contract = await ethers.getContractAt(
    'ILendingPoolAddressesProvider',
    '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    account)

    const lendingPoolAddress = await contract.getLendingPool()
    const lending_Pool = await ethers.getContractAt('ILendingPool',lendingPoolAddress,account)
    return lending_Pool

}

async function approveErc20(erc20Address,spenderAddress,amount,account){
    const erc20 = await ethers.getContractAt(
    'IERC20',
    erc20Address,
    account
    )
    
    const tx = await erc20.approve(spenderAddress,amount)
    tx.wait(1)
    console.log('approved');
}
main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1)
})