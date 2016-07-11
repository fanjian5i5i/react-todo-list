import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle () {
    console.log(this.state);
    this.setState({open: !this.state.open});
  } 
  handleClose () {
    this.setState({open: false});
  } 

  render() {
    return (
      <div>
        <IconButton 
          label="Open Drawer"
          onTouchTap={this.handleToggle.bind(this)}>
          <NavigationMenu color={"white"}/>
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Roles</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Reports</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Analytics</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Correspondence</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Setup</MenuItem>
          <MenuItem 
            primaryText="Admin"
            rightIcon={<ArrowDropRight />}
            menuItems={[
                <MenuItem primaryText="Log In" />,
                <MenuItem primaryText="Update"/>,
                <MenuItem primaryText="Reset" />,
                <MenuItem primaryText="Rules" />,
              ]}
            >
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Lease Administration</MenuItem>
        </Drawer>
      </div>
    );
  }
}