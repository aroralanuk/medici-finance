# Medici smart contracts

Official smart contracts for medici finance.

## Deployments

<table>
<tr>
<th>Network</th>
<th>MediciPool</th>
</tr>

<tr><td>Polygon Mumbai</td><td rowspan="13">

[0xbC0115dEdAE16194d4c5E02CCC787650ea65E60a](https://mumbai.polygonscan.com/address/0xbc0115dedae16194d4c5e02ccc787650ea65e60a)

</td></tr>
<tr><td>Polygon Mainnet</td></tr>

</table>

## Install

Medici used Foundry for contract testing and deployment. To install Foundry (assuming a Linux or macOS system):

```bash
curl -L https://foundry.paradigm.xyz | bash
```

This will download foundryup. To start Foundry, run:

```bash
foundryup
```

To install dependencies and compile contracts:

```bash
git clone https://github.com/aroralanuk/medici-finance.git && cd medici-finance
forge install
forge build
```

## Usage

To run Foundry tests written in Solidity:

```bash
forge test
```
