import React from "react";
import NewOrders from "../components/dashboard/NewOrders";
import MonthlySales from "../components/dashboard/MonthlySales";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import Data from "../data";
import axios from 'axios';




class DashboardPage extends React.Component {
  


  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        posts: [],
        show:false
    };
  }
  // async haha(city) {
    
  //   // for (var i =0;i<city.length;i++)
  //   var cont = true;
  //   var i=0;
  //   var listTrip_City=[];
  //   cont=false
  //     var city_ = city[i];

  //     await axios({
  //       method: 'GET',
  //       url: '/api/categories'+city_.city,
  //       headers : {
  //         Authorization: "Bearer" + localStorage.getItem("token")
  //       },
  //       data: null
  //     }).then((response) => {
  //         // handle success
  //         console.log("abc", response.data);
  //         var count = response.data.trips.length
  //         listTrip_City.push({name:city_.city,trips:count})
  //         i++;
  //         cont = true;
  //         }).catch((error) => {
  //         // handle error
  //         console.log(error.response);
          
  //     });
  // }
  async componentWillMount() {
          await axios({
            method: 'GET',
            url: '/api/categories',
            headers : {
              Authorization: "Bearer" + localStorage.getItem("token")
            },
            data: null
          }).then((response) => {
              // handle success
              console.log("abc", response.data);
              this.setState({
                categories : response.data.categories
              })

              // var getdata = response.data.orders.splice(response.data.orders.length - 6);
              // this.setState({
              //     listOrderRecent: getdata
              // })
          }).catch((error) => {
              // handle error
              console.log(error);
          });
          await axios({
            method: 'GET',
            url: '/api/set',
            headers : {
              Authorization: "Bearer" + localStorage.getItem("token")
            },
            data: null
          }).then((response) => {
              // handle success
              // this.setState({
              //     posts : response.data.post 
              // })
              var getdata = response.data.sets.splice(response.data.sets.length - 10);
              this.setState({
                  posts: getdata
              })
              console.log(this.state.posts)
          }).catch((error) => {
              // handle error
              console.log(error);
          });
    }

  render()
  {


  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <RecentlyProducts data={this.state.posts} />
        </Grid>
        <Grid item xs={12} sm={8} container spacing={0}>
        <Grid item xs={12} sm={12}>
             <NewOrders data={Data.dashBoardPage.newOrders} />
              </Grid>
              <Grid item xs={12} sm={12} >
                <MonthlySales data={this.state.categories}/>
              </Grid>
        </Grid>
          
       
      </Grid>
      
     
      
    </div>
  );
  };
};

export default DashboardPage;
