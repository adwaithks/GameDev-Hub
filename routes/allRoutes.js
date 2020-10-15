const jwtVerification = require("./jwtVerification");
const router = require("express").Router();
const Game = require("../models/gameModel");
const User = require("../models/userModel");
const formidable = require("express-formidable");
const Schedule = require("../models/scheduleModel");
const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const Comment = require("../models/commentModel");

router.post(
  "/schedule",
  formidable({
    encoding: "utf-8",
    uploadDir: "./uploads/games/zips",
    multiples: false,
  }),
  jwtVerification,
  async (req, res) => {
    const user = await User.findOne({
      email: req.user.email,
    });
    if (!user) return res.json("Internal Server Error");

    if (req.files.zipFile) {
      const filename = req.files.zipFile.path.match(/(\upload_.*)/g).toString();
      newfilename = filename + ".zip";
      try {
        fs.renameSync(
          `./uploads/games/zips/${filename}`,
          `./uploads/games/zips/${newfilename}`
        );
        //fs.mkdirSync(`./uploads/games/files/${filename}`);
        console.log("filename" + filename);
      } catch (error) {
        return res.status(500).json("Internal Server Error");
      }
    }
    if (!req.fields.fee) {
      req.fields.fee = "Free";
    }
    if (!req.fields.hostURL) {
      req.fields.hostURL = "";
    }

    const newSchedule = new Schedule({
      release: req.fields.datetime,
      name: req.fields.gname,
      gameFile: newfilename,
      longdescription: req.fields.ldescription,
      description: req.fields.sdescription,
      creator: user.username,
      category: req.fields.category,
      platform: req.fields.platform,
      price: req.fields.fee,
      imageURL: req.fields.imageURL,
      hostURL: req.fields.hostURL,
    });

    let datetime = req.fields.datetime;
    let amorpm = req.fields.amorpm;

    let temp = datetime.split("T");
    let date = temp[0].split("-");
    let time = temp[1].split(":");

    console.log(
      date[0] +
        " " +
        (parseInt(date[1]) - 1) +
        " " +
        date[2] +
        " " +
        time[0] +
        " " +
        time[1] +
        " " +
        amorpm
    );

    const scheduleNewJob = async (
      year,
      month,
      date,
      hour,
      minutes,
      amorpm,
      id,
      user
    ) => {
      let newdate = new Date(year, month, date, hour, minutes, amorpm);
      if (newdate === "Invalid Date") {
        return res.status(500).json("Invalid Date");
      }
      console.log("New release scheduled on " + newdate);
      let j = schedule.scheduleJob(newdate, async function () {
        const game = await Schedule.findOne({
          _id: id,
        });
        console.log("after finding the game from schedule::::" + game);

        const newgame_ = new Game({
          name: game.name,
          gameFile: game.gameFile,
          longdescription: game.longdescription,
          description: game.description,
          creator: game.creator,
          category: game.category,
          platform: game.platform,
          price: game.price,
          imageURL: game.imageURL,
          hostURL: game.hostURL,
        });

        await Schedule.findOneAndDelete({ _id: id }, (err) => {
          if (err) console.log(err);
          console.log("successfully deleted from schedule!");
        });

        await user.createdGames.push(newgame_._id);
        user.noOfCreatedGames += 1;

        await user
          .save()
          .then()
          .catch((err) => {
            return res.json("Internal Server Error");
          });
        await newgame_
          .save()
          .then()
          .catch((err) => {
            console.log(err);
          });
        console.log("Now Released:::::" + newgame_);
      });
    };

    await newSchedule
      .save()
      .then()
      .catch((err) => {
        return res.status(500).json("Internal Server Error");
      });

    scheduleNewJob(
      date[0],
      parseInt(date[1]) - 1,
      date[2],
      time[0],
      time[1],
      amorpm,
      newSchedule._id,
      user
    );

    res.redirect("http://localhost:3000/myprofile");
  }
);

router.get("/myschedules", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");
  const schedules = await Schedule.find();
  res.json(schedules);
});

router.post(
  "/create/game",
  formidable({
    encoding: "utf-8",
    uploadDir: "./uploads/games/zips",
    multiples: false,
  }),
  jwtVerification,
  async (req, res) => {
    const user = await User.findOne({
      email: req.user.email,
    });
    if (!user) return res.json("Internal Server Error");

    if (req.files.zipFile) {
      const filename = req.files.zipFile.path.match(/(\upload_.*)/g).toString();
      newfilename = filename + ".zip";
      try {
        fs.renameSync(
          `./uploads/games/zips/${filename}`,
          `./uploads/games/zips/${newfilename}`
        );
        //fs.mkdirSync(`./uploads/games/files/${filename}`);
        console.log("filename" + filename);
      } catch (error) {
        return res.status(500).json("Internal Server Error");
      }
    }
    if (!req.fields.fee) {
      req.fields.fee = "Free";
    }
    if (!req.fields.hostURL) {
      req.fields.hostURL = "";
    }

    const newGame = new Game({
      name: req.fields.gname,
      gameFile: newfilename,
      longdescription: req.fields.ldescription,
      description: req.fields.sdescription,
      creator: user.username,
      category: req.fields.category,
      platform: req.fields.platform,
      price: req.fields.fee,
      imageURL: req.fields.imageURL,
      hostURL: req.fields.hostURL,
    });

    await user.createdGames.push(newGame._id);
    user.noOfCreatedGames += 1;

    await user
      .save()
      .then()
      .catch((err) => {
        return res.json("Internal Server Error");
      });
    await newGame
      .save()
      .then((doc) => {
        //await decompress(`./uploads/games/zips/${newfilename}`, `./uploads/games/files/${filename}`);
        res.redirect("http://localhost:3000/myprofile");
      })
      .catch((err) => {
        return res.status(500).json("Internal Server Error");
      });
  }
);

/**           COMMENT ROUTES  START        **/

router.post("/game/:gameid/makecomment", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    username: req.user.username,
  });
  if (!user) return res.json({ message: "a" });

  const game = await Game.findOne({
    _id: req.params.gameid,
  });
  if (!game) return res.json({ message: "b" });

  console.log(user.username);
  const newComment = await new Comment({
    comment: req.body.comment,
    commentBy: user.username,
    game: game._id,
  });

  console.log(newComment);
  await newComment
    .save()
    .then((doc) => {
      console.log("doc::::" + doc);
    })
    .catch((err) => {});

  game.comments.push(newComment._id);
  user.comments.push(newComment._id);
  await game
    .save()
    .then()
    .catch((err) => {});
  await user
    .save()
    .then(() => {
      return res.json("OK");
    })
    .catch((err) => {});
});

router.get("/game/:id/comments", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    username: req.user.username,
  });
  console.log(user);
  if (!user) return res.json({ message: "User does not exist" });
  const game = await Game.findOne({
    _id: req.params.id,
  });
  if (!game) return res.json({ message: "User does not exist" });
  const gamecommentids = game.comments;
  const final = await Comment.find({ _id: { $in: gamecommentids } });
  console.log(final);
  res.status(200).json(final);
});

router.get(
  "/game/:id/removecomment/:commentid",
  jwtVerification,
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    });
    if (!user) return res.json({ message: "User does not exist1" });

    if (!user.comments.includes(req.params.commentid)) {
      return res.json({ message: "User does not have right to delete" });
    }

    const game = await Game.findOne({
      _id: req.params.id,
    });
    if (!game) return res.json({ message: "User does not exist2" });

    const comment = await Comment.findOne({
      _id: req.params.commentid,
    });
    if (!comment) return res.json({ message: "User does not exist3" });
    user.comments.pull(req.params.commentid);
    game.comments.pull(req.params.commentid);

    await user
      .save()
      .then()
      .catch((err) => {});
    await game
      .save()
      .then((doc) => {
        res.json("OK");
      })
      .catch((err) => {
        return res.status(500).json("Internal Server Error");
      });
  }
);

/**           COMMENT ROUTES  END        **/

router.get("/profile/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({
    username: username,
  });
  if (!user) return res.json({ message: "User does not exist" });

  res.json({
    _id: user._id,
    email: user.email,
    username: user.username,
    createdGames: user.createdGames,
    favouriteGames: user.favouriteGames,
    noOfCreatedGames: user.noOfCreatedGames,
    rating: user.rating,
    signal: user.signal,
    popularity: user.popularity,
  });
});

router.get("/game/:id/view", async (req, res) => {
  try {
    const gameid = req.params.id;
    const game = await Game.findOne({
      _id: gameid,
    });
    if (!game) return res.json("Internal Server Error");

    res.json(game);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/trending", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  const game = await Game.find()
    .sort({
      downloads: -1,
    })
    .limit(10);
  res.status(200).json(game);
});

router.get("/mostfavourites", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  const game = await Game.find()
    .sort({
      favourites: -1,
    })
    .limit(10);
  res.status(200).json(game);
});

router.get("/allgames", async (req, res) => {
  try {
    const game = await Game.find();
    if (!game) return res.json("Internal Server Error");
    console.log(game);
    res.json(game);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/mycreatedgames", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  try {
    const games = await user.createdGames;
    if (!games) return res.json("User has not created any games yet.");
    const final = await Game.find({ _id: { $in: games } });
    res.json(final);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/:author/createdgames", async (req, res) => {
  try {
    const doc = await Game.find({
      creator: req.params.author,
    });
    //const games = await user.createdGames;
    //if (!doc) return res.json('User has not created any games yet.');
    //const final = await Game.find({_id: {$in : games}})
    res.json(doc);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/:author/favouritegames", async (req, res) => {
  try {
    const doc = await User.findOne({
      username: req.params.author,
    });
    const games = doc.favouriteGames;
    if (!games) return res.json("No Favourites");
    const final = await Game.find({ _id: { $in: games } });
    res.json(final);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.get("/download/:id", jwtVerification, async (req, res) => {
  const game = await Game.findOne({
    gameFile: req.params.id,
  });
  if (!game) return res.status(500).json("Internal Server Error");
  game.downloads += 1;
  (await game)
    .save()
    .then()
    .catch((err) => {
      return res.status(500).json("Internal Server Error");
    });

  const file = path
    .join(__dirname, `../uploads/games/zips/${req.params.id}`)
    .toString();
  res.status(200).download(file, "game.zip");
});

router.get("/myfavouritegames", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  try {
    const games = await user.favouriteGames;
    if (!games) return res.json("No Favourites");
    const final = await Game.find({ _id: { $in: games } });
    res.json(final);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/:id/makefavourite", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  const gameid = req.params.id;

  const game = await Game.findOne({
    _id: gameid,
  });
  if (!game) return res.json("Internal Server Error");

  try {
    if (!gameid) return res.json("Internal Server Error");
    if (!user.favouriteGames.includes(gameid)) {
      user.favouriteGames.push(gameid);
      game.favourites += 1;
      await game
        .save()
        .then()
        .catch((err) => {
          return res.json("Internal Server Error");
        });
      await user
        .save()
        .then((doc) => {
          return res.json("Added to Favourites");
        })
        .catch((err) => {
          return res.json("Internal Server Error");
        });
    } else {
      return res.json("Already in favourites");
    }
  } catch (error) {
    return res.json("Internal Server Error");
  }
});

router.get("/:id/removefavourite", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  const gameid = req.params.id;

  const game = await Game.findOne({
    _id: gameid,
  });
  if (!game) return res.json("Internal Server Error");

  try {
    if (!gameid) return res.json("Internal Server Error");
    if (user.favouriteGames.includes(gameid)) {
      user.favouriteGames.pull(gameid);
      game.favourites -= 1;
      await game
        .save()
        .then()
        .catch((err) => {
          return res.json("Internal Server Error");
        });
      await user
        .save()
        .then((doc) => {
          res.json("Removed from favourites.");
        })
        .catch((err) => {
          res.json("Internal Server Error");
        });
    } else {
      res.json("Already not a favourite.");
    }
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/myLikedGames", jwtVerification, async (re, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");

  try {
    res.status(200).json(user.likedGames);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/:id/like", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");
  try {
    const gameid = req.params.id;
    const game = await Game.findOne({
      _id: gameid,
    });
    if (!game) return res.json("Internal Server Error");
    if (game.likedPeoples.includes(user._id)) {
      return res.json("Cannot like more than Once").status(403);
    }
    if (game.dislikedPeoples.includes(user._id)) {
      game.dislikedPeoples.remove(user._id);
      game.dislikes -= 1;
    }
    game.likes += 1;
    game.likedPeoples.push(user._id);
    await game
      .save()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.json("Internal Server Error");
      });
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/:id/dislike", jwtVerification, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  if (!user) return res.json("Internal Server Error");
  try {
    const gameid = req.params.id;
    const game = await Game.findOne({
      _id: gameid,
    });
    if (!game) return res.json("Internal Server Error");
    if (game.dislikedPeoples.includes(user._id)) {
      return res.json("Cannot dislike more than once.");
    }
    if (game.likedPeoples.includes(user._id)) {
      game.likedPeoples.remove(user._id);
      game.likes -= 1;
    }
    game.dislikes += 1;
    game.dislikedPeoples.push(user._id);
    await game
      .save()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.json("Internal Server Error");
      });
  } catch (error) {
    res.json("Internal Server Error");
  }
});

module.exports = router;
