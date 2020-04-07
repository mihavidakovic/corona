import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";


class Donate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
			},
		};
	}

	componentDidMount() {
	}



	render() {
		return (
			<div className="donate">
		      <PayPalButton
		        amount="2.00"
		        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
		        options={{
		          clientId: "45DUVZZZUDFFC",
		          currency: "EUR"
		        }}
		      />
			</div>
		);

	}

}

export default Donate;
