import { ethers } from 'ethers';

import MediciPoolABI from './abi/MediciPool.json';

const poolInterface = new ethers.utils.Interface(MediciPoolABI.abi);
