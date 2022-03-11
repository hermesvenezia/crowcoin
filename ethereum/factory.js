import web3 from './web3'; 


import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0xD8CA18D181C7A30e20cCcBDF337ea361819a3f25'
);

export default instance; 