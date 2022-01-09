let express=require('express');
let mongoose=require('mongoose');
let upload=require('express-fileupload');
let app=express();
let port=process.env.PORT||5000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(upload());

let name="";
let email="";
let password="";
let password1="";
let filename="";
let ename="";
let des="";
let date="";

const url="mongodb+srv://santhosh:1234@cluster0.jyuvr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 mongoose.connect(url||'mongodb://localhost:27017/Ehorizon');

 mongoose.connection.on('connected',()=>{
     console.log("mongoDb connected");
 })

 let Schema={
name:String,
email:String,
password:Number,
password1:Number,
 }

 let model=mongoose.model('events',Schema);

 let adminSchema={
     email:String,
     password:Number,
 };

 let adminmodel=mongoose.model('admin',adminSchema);

 let admindocs=new adminmodel({
    email:"santhoshkuamarc.19cse@kongu.edu",
    password:"8112000",
});

admindocs.save();

let addeventSchema={
    addname:String,
    des:String,
    date:String,
    file:String,
}

let addeventmodel=mongoose.model('addevent',addeventSchema);

let workshop={
    name:String,
    email:String,
    dept:String,
    roll:String,
    mobile:Number,
};

let workshopmodel=mongoose.model('workshop',workshop);

let project={
    name:String,
    email:String,
    dept:String,
    roll:String,
    mobile:Number,
};

let projectmodel=mongoose.model('project',project);

let ppt={
    name:String,
    email:String,
    dept:String,
    roll:String,
    mobile:Number,
};

let pptmodel=mongoose.model('ppt',ppt);


let ideathon={
    name:String,
    email:String,
    dept:String,
    roll:String,
    mobile:Number,
};

let ideathonmodel=mongoose.model('ideathon',ideathon);

let otherevents={
    name:String,
    email:String,
    event:String,
    dept:String,
    roll:String,
    mobile:Number,
};

let othereventmodel=mongoose.model('otherevent',otherevents);



app.get('/',(req,res)=>{
res.render('registration');
});

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/event',(req,res)=>{
    addeventmodel.find({},(err,datas)=>{
        if(!err){
            res.render('event',{event:datas});
        }
    })
});

app.get('/wrong',(req,res)=>{
    res.render('wrong');
});

app.get('/invalid',(req,res)=>{
    res.render('invalid');
})

app.get('/admin',(req,res)=>{
    res.render('admin');
})
app.get('/aevent',(req,res)=>{
    addeventmodel.find({},(err,datas)=>{
        if(!err){
            res.render('aevent',{event:datas});
        }
    })
   
})

app.get('/usermove',(req,res)=>{

    // addeventmodel.find({},(err,founduser)=>{
    //     if(!err){
    //         res.render('usermove',{event:founduser});
    //     }
    // })
    res.render('usermove');
    
});

app.get('/usermove/:topic',(req,res)=>{

})

app.get('/event-reg',(req,res)=>{
    res.render('invidual');
})

app.get('/addevent',(req,res)=>{
   
res.render('addevent');
});

app.get('/invidual',(req,res)=>{
    res.render('invidual');
});

app.get('/Cloud%20Workshop',(req,res)=>{
    res.render('usermove');
});

app.get('/Cloud%20Workshop/:topic',(req,res)=>{
    workshopmodel.find({},(err,found)=>{
        if(!err){
            res.render('cloudworkshop',{data1:found});
        }else{
            console.log(err);
        }
    })
})

app.get('/Cyberdome',(req,res)=>{
    res.render('project');
});

app.get('/Cyberdome/data',(req,res)=>{
    projectmodel.find({},(err,found)=>{
        if(!err){
            res.render('projectdata',{data2:found});
        }else{
            console.log(err);
        }
    })
})

app.get('/Seminar%20on%20IOT',(req,res)=>{
    res.render('ppt');
})

app.get('/Seminar%20on%20IOT/data',(req,res)=>{
    pptmodel.find({},(err,found)=>{
        if(!err){
            res.render('pptdata',{data3:found});
        }else{
            console.log(err);
        }
    })
})

app.get('/ideathon',(req,res)=>{
    res.render('ideathon');
});

app.get('/ideathon/data',(req,res)=>{
    ideathonmodel.find({},(err,found)=>{
        if(!err){
            res.render('ideathondata',{data4:found});
        }else{
            console.log(err);
        }
    })
});

app.get('/sucess',(req,res)=>{
    res.render('sucess');
});
app.get('/dataindex',(req,res)=>{
    addeventmodel.find({},(err,found)=>{
if(!err){
    res.render('dataindex',{data:found});
}else{
    console.log(err);
}
    })
    
});




app.get('/:topic',(req,res)=>{
    res.render('otherevent');
})
app.get('/:topic/data',(req,res)=>{
    othereventmodel.find({},(err,found)=>{
        if(!err){
            res.render('otherdata',{data5:found});
        }else{
            console.log(err);
        }
            })
})


app.post('/',(req,res)=>{
    name=req.body.name;
    email=req.body.email;
    password=req.body.password;
    password1=req.body.password1;

    let eventmodel=new model({
        name:name,
        email:email,
        password:password,
        password1:password1,
    });

    

    if(password==password1){
        eventmodel.save();
        res.redirect('/login');
    }else{
        
      res.redirect('wrong');

    }

    
});

app.post('/addevent',(req,res)=>{
     ename=req.body.name;
     des=req.body.descript;
     date=req.body.date;
    let file=req.files.img;
    filename=file.name;
    console.log(filename);
    file.mv('./public/uploads/'+filename,(err)=>{
        if(!err){
            console.log("images uploaded sucessfully");
        }else{
            console.log(err);
        }
    })

    let addeventdocs=new addeventmodel({
        addname:ename,
        des:des,
        date:date,
        file:filename,
    });

    addeventdocs.save();
res.redirect('/aevent');
    
})


app.post('/delete',(req,res)=>{
let dele=req.body.checkbox;
addeventmodel.findByIdAndDelete(dele,(err)=>{
    if(!err){
        console.log("deleted sucessfully");
        res.redirect('/aevent');
    }else{
        console.log(err);
    }
})
})
app.post('/login',(req,res)=>{
    let name1=req.body.name1;
    let email1=req.body.email1;
    let passwords=req.body.passwords;

    model.findOne({"name":name1},(err,users)=>{
        if(!err){
            if(users){
                if((users.email==email1)&&(users.password==passwords)){
                    res.redirect('/event');
                }else{
                    res.redirect('/invalid');
                }
            }else{
                res.redirect('/invalid');
            }
        }else{
            console.log(err);
        }
    })
})

app.post('/admin',(req,res)=>{
    let aemail=req.body.email;
    let apassword=req.body.password;

    adminmodel.findOne({"email":aemail},(err,admin)=>{
        if(!err){
            if(admin){
                if((admin.email==aemail)&&(admin.password==apassword)){
                    res.redirect('/aevent');
                }else{
                    res.redirect('/admin');
                }
            }else{
                res.redirect('/admin');
            }
        }else{
            console.log(err);
        }
    })

    if((aemail=="santhosh@gamil.com")&&(apassword=="8112000")){
        res.redirect('/aevent');
    }
});

app.post('/workshop',(req,res)=>{
    let uename=req.body.name;
    let ueemail=req.body.email;
    let uedept=req.body.dept;
    let ueroll=req.body.roll;
    let uemobile=req.body.mobile;

    let workshopdocs=new workshopmodel({
        name:uename,
        email:ueemail,
        dept:uedept,
        roll:ueroll,
        mobile:uemobile,
    });

    workshopdocs.save();
res.redirect('/sucess');
})

app.post('/project',(req,res)=>{
    let uename=req.body.name;
    let ueemail=req.body.email;
    let uedept=req.body.dept;
    let ueroll=req.body.roll;
    let uemobile=req.body.mobile;

    let projectdocs=new projectmodel({
        name:uename,
        email:ueemail,
        dept:uedept,
        roll:ueroll,
        mobile:uemobile,
    });

    projectdocs.save();
    res.redirect('/sucess');
})

app.post('/ppt',(req,res)=>{
    let uename=req.body.name;
    let ueemail=req.body.email;
    let uedept=req.body.dept;
    let ueroll=req.body.roll;
    let uemobile=req.body.mobile;

    let pptdocs=new pptmodel({
        name:uename,
        email:ueemail,
        dept:uedept,
        roll:ueroll,
        mobile:uemobile,
    });

    pptdocs.save();
    res.redirect('/sucess');
})
app.post('/ideathon',(req,res)=>{
    let uename=req.body.name;
    let ueemail=req.body.email;
    let uedept=req.body.dept;
    let ueroll=req.body.roll;
    let uemobile=req.body.mobile;

    let ideathondocs=new ideathonmodel({
        name:uename,
        email:ueemail,
        dept:uedept,
        roll:ueroll,
        mobile:uemobile,
    });

    ideathondocs.save();
    res.redirect('/sucess');
})

app.post('/userevents',(req,res)=>{
    let uename=req.body.name;
    let ueemail=req.body.email;
    let ueevent=req.body.event;
    let uedept=req.body.dept;
    let ueroll=req.body.roll;
    let uemobile=req.body.mobile;

    let othereventdocs=new othereventmodel({
        name:uename,
        email:ueemail,
        event:ueevent,
        dept:uedept,
        roll:ueroll,
        mobile:uemobile,
    });

    othereventdocs.save();
    res.redirect('/sucess');
})

app.listen(port,(res)=>{
    console.log(`server runs on ${port}`);
})