import React, {Component} from "react";
import {connect} from "react-redux"
import PropType from "prop-types"
import {GetUserState, ResetUserState, SetUserState} from "../../redux/actions";

class Auth extends Component {

  static propTypes = {
    UserState: PropType.object,
    SetUserState: PropType.func.isRequired,
    GetUserState: PropType.func.isRequired,
    ResetUserState: PropType.func.isRequired,
  }

  state = {
    userInfo: {},
    accessToken: "",
    refreshToken: "",
  };

  componentDidMount() {
    this.props.GetUserState()
    const {userInfo, accessToken, refreshToken} = this.props.UserState;

    if (!(userInfo && accessToken && refreshToken)) {
      this.props.ResetUserState();
      window.location.href = `${process.env.REACT_APP_AUTH_URL}/login?redirectURL=${window.location.href}`
    }

    this.setState({
      userInfo,
      accessToken,
      refreshToken
    })
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default connect(
  state => ({UserState: state.UserState}), //state就是一个comments数组
  {SetUserState, GetUserState, ResetUserState}
)(Auth);

