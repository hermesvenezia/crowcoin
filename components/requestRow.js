import React, {Component} from 'react'; 
import { Table, Button} from "semantic-ui-react";
import web3 from '../ethereum/web3';
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component{
	state = {
		loadingApprove: false,
		loadingFinalize: false
	}
	onApprove = async () => {
		this.setState({loadingFinalize: true});
		const  campaign = Campaign(this.props.address);
		try{
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });
		}catch (err) {
			this.setState({loadingApprove: false});
		}
		this.setState({loadingApprove: false});
      	Router.pushRoute(`/campaigns/${this.props.address}/requests`);
	}

	onFinalize = async () => {
		this.setState({loadingFinalize: true});

		const campaign = Campaign(this.props.address);
		try{ 
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.finalizeRequest(this.props.id).send({ from: accounts[0]});
		}catch (err){ 
			this.setState({loadingFinalize: false});
		}
		this.setState({loadingFinalize: false});
		Router.pushRoute(`/campaigns/${this.props.address}/requests`);
	}
	render() {
		const {Row, Cell} = Table;
		const readyToFinalize = this.props.request.approvalCount > this.props.approversCount/2
		return (
			<Row disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete} >
				<Cell> {this.props.id} </Cell>
				<Cell> {this.props.request.description} </Cell>
				<Cell> { web3.utils.fromWei(this.props.request.value,'ether')}</Cell>
				<Cell> {this.props.request.recipient} </Cell>
				<Cell> {this.props.request.approvalCount} / {this.props.approversCount} </Cell>
				<Cell> { this.props.request.complete ? null : (<Button color="green" basic onClick={this.onApprove} loading={this.state.loadingApprove} > Approve </Button>) }</Cell>
				<Cell> {this.props.request.complete ? null : (<Button color="teal" basic onClick={this.onFinalize} loading={this.state.loadingFinalize} > Finalize </Button>)}</Cell>
			</Row>
			);
	}
}

export default RequestRow;