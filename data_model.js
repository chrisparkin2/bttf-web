

module.exports = {
  user : {
    first_name : "",
    last_name : "",
    birthday : Date(),
    fbid : "",
    facebook_token : "",
    city : "",
    likes : [],
    restaurants_visited : [],
    app_version : "",
    installation_id : ""
  },

  dish : {
    restaurant : "",
    price : "",
    image_url : "",
    spicy : "",
    sweet : "",
    type : "",
    likes : [],
    avg_rating : "",
    conversation_rate : ""
  },

  restaurant : {
    city : "",
    lat : "",
    lon : "",
    type : "",
    ethnicity : "",
    quality : "",
    dishes : [],
    visits : []
  },

  like : {
    user : "",
    dish : "",
    lat : "",
    lon : "",
    restaurant : ""
  },

  visit : {
    user : "",
    like : "",
    restaurant : ""
  }
}

