import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NavbarSignedIn from "./NavbarSignedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const LatestNews = () => {
  const classes = useStyles();

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("/user/news").then((news) => setNews(news.data));
  }, []);

  let url = "#";
  return (
    <div>
      <NavbarSignedIn />
      <div className={classes.root}></div>
      <h2 style={{ marginLeft: "20px", fontSize: "28px" }}>Latest NEWS</h2>
      <Grid container spacing={0}>
        {news.map((news) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={news._id}>
            <Card className={classes.root} mt={5}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title={news.title}
                subheader={news.publishedAt}
              />
              <CardMedia
                className={classes.media}
                image={news.urlToImage}
                title={news.source.name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {news.description}
                </Typography>
                <Button
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                  href={url}
                >
                  Read More
                </Button>
                <Link href={news.url} target="_blank" rel="noopener">
                  <Button
                    variant="outlined"
                    style={{
                      marginTop: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    Source Site
                  </Button>
                </Link>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LatestNews;
