use ProjectDB
db.createCollection("Flights", { autoIndexId : true} )

db.Flights.drop()

db.Flights.insert(
    [
        {
            Name:"Ahmed",
            "no":1,
            from:"Egypt",
            to:"Paris",
            time:"11:00",
            price:1000,
            status:[true,"Reserved"]
        },
        {
            Name:"Engy",
            "no":2,
            from:"Egypt",
            to:"Canada",
            time:"15:00",
            price:2000,
            status:[false,"Available"]
        },
        {
            Name:"H",
            "no":3,
            from:"Egypt",
            to:"USA",
            time:"22:00",
            price:800,
            status:[false,"Available"]
        },
        ,
        {
            Name:"Hadeer",
            "no":4,
            from:"Egypt",
            to:"German",
            time:"8:00",
            price:5000,
            status:[true,"Reserved"]
        },
            
    ]
    )

db.Flights.createIndex({no:1},{unique: true})

db.Flights.find({})

//db.Flights.dropIndexes()



