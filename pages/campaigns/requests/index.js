import React, {Component} from 'react'; 
import Layout from "../../../components/Layout";
import {Link } from "../../..//routes";
import { Grid, Button, Table} from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from"../../../components/requestRow";
class RequestIndex extends Component{ 
	static async getInitialProps(props){
		const {address} = props.query; 
		const campaign = Campaign(address);
		const requestCount = await campaign.methods.getRequestsCount().call();
		const requests = await Promise.all(
				Array(requestCount).fill().map((element,index) => {
					return campaign.methods.requests(index).call();
				})
			);
		const approversCount = await campaign.methods.approversCount().call();
		return {address, requests, requestCount, approversCount};
	}
	renderRows(){
		return this.props.requests.map(((request,index) => {
			return <RequestRow request={request} id={index} key={index} address={this.props.address} approversCount={this.props.approversCount} />
		}));
	}
	render(){ 
		const  {Header, Row, HeaderCell, Body } = Table;
		return (
				<Layout>
					<Grid>
						<Grid.Row>
							<Grid.Column width={7} >
								<h3>Request List </h3>
							</Grid.Column>
							<Grid.Column width={3}>
								<Link route={`/campaigns/${this.props.address}/requests/new`}>
									<a><Button primary > Create Request </Button></a>
								</Link>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={10}>
								<Table>
									<Header>
										<Row>
											<HeaderCell>ID</HeaderCell>
											<HeaderCell>Description</HeaderCell>
											<HeaderCell>Amount</HeaderCell>
											<HeaderCell>Recipient</HeaderCell>
											<HeaderCell>Approval Count</HeaderCell>
											<HeaderCell>Approve</HeaderCell>
											<HeaderCell>Finalize</HeaderCell>
										</Row>
									</Header>
									<Body>
										{this.renderRows()}
									</Body>
								</Table>
							</Grid.Column>
							<Grid.Column>

							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={3} >
								Found <b> {this.props.requestCount} </b> requests.
							</Grid.Column>
							<Grid.Column>
							</Grid.Column>
						</Grid.Row>

					</Grid>
				</Layout>
			);
	}
}

export default RequestIndex;