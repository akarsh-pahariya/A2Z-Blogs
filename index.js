import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
var obj = [{title : "Brighter Days Ahead", 
    content: "Tough times, these. Resolution of conflicts on many fronts helps, but more is to come.Once we've jetted off east things will really start looking up.But until then: paint, parking, wood, tables, chairs, sardar, food, drink, lists, healthy doses of work and many more..We're getting there."},
    { title : "Up Up and Away!", 
    content : "Took the plunge. Dealing with the fall-out. About to secure my freedom from the evil tentacled monster. Takes 12 steps, but I hit a brick wall at 8. Took time off to recuperate and recover my energy. Now back from paradise, rejuvenated and ready to take on the beast again. All eyes on the prize, one more trip to deliver the coup de grace to that other beast in the west. Once that's done, its just a matter of time and protocol until the next step is reached. Its scary and new, but isn't that just what makes it all so deliciously exciting?"}
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs",{blogs : obj});
});

app.get("/add", (req,res) => {
    res.render("add.ejs");
});

app.get("/edit/:index", (req,res) => {
    const index = req.params.index;
    res.render("edit.ejs",{blog: obj[index], i : index});
});

app.get("/delete/:index", (req,res) => {
    const index = req.params.index;
    obj.splice(index,1);
    res.render("index.ejs",{blogs : obj});
});

app.post("/add", (req,res) => {
    var len = obj.length;
    obj[len] = {title : req.body["title"], content : req.body["content"]};
    res.render("index.ejs", {blogs : obj});
});

app.post("/edit/:index", (req,res) => {
    var index = req.params.index;
    obj[index].title=req.body["title"];
    obj[index].content=req.body["content"];    
    res.render("index.ejs",{blogs : obj});
});

app.listen(port,() => {
    console.log("Server is live at location " + port);
});