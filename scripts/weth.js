const {getNamedAccounts, ethers} = require('hardhat')

const AMOUNT = ethers.utils.parseEther('0.02')
async function getWeth() {
    const [deployer] = await ethers.getSigners() // get the deployer
    const contract = await ethers.getContractAt('IWeth','0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',deployer
    )

    const tx =await contract.deposit({value : AMOUNT})
    await tx.wait(1)
    const wethBalance = await contract.balanceOf(deployer.address)
    console.log(wethBalance.toString());
}

module.exports = {
    getWeth,
    AMOUNT
}