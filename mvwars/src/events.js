//Template for events
/*
Title:"",
Description:"",
Options: [{Title:"",
           Reference:{
             Title:"",
             Description:"",
             Options:[
               {
                 Title:"",
                 Reference:"random",
                Event:true
               }
             ]
           },
           Event:true
          }]
}
*/


var events = [
  {
    Title:"You step through the warp portal and find yourself in a bar.",
    Description:"The room is full of laughter and warmth - it's a lively night. Maybe a little too lively...there are a few rowdy fellows making a commotion in the far corner.",
    Options: [{Title:"Order a drink",
               Reference:{
                  Title:"You sit down and order a beer.",
                  Description:"It tastes watery. After a while, the bar starts to empty. You don't see a reason to stay, so you prepare to leave.",
                  Options:[
                    {
                      Title:"Warp somewhere else",
                      Reference:"random",
                      Event:true
                    },
                 ]
               },
               Event:true
             },

             //combat object
             {Title:"Start a fight",
              Reference:{
                 Title:"You leer at one of the boys in the back.",
                 Description:"He leers back.",
                 Options:[
                   {
                     Title:"Prepare to fight",
                     Reference:"random",
                     Event:false
                   },
                ]
              },
              Event:true
              },
            ],
     Event:true
  },
  {
    Title:"After exiting the warp portal, you find yourself in a dark cavern.",
    Description:"You can feel the moisture in the air - it feels exceptionally humid. Peering deeper in the cave, you can make out a few small subcaves.",
    Options: [{Title:"This is dangerous - I'll warp out.",
               Reference:{
                  Title:"Sometimes it's prudent to be a coward.",
                  Description:"You ready your warp gun for another jump.",
                  Options:[
                    {
                      Title:"Warp somewhere else",
                      Reference:"random",
                      Event:true
                    },
                 ]
               },
               Event:true
             },

             //combat object
             {Title:"Go deeper into subcave 1",
              Reference:{
                 Title:"You find a cave monster waiting for you.",
                 Description:"He takes a good look at you and starts licking his lips.",
                 Options:[
                   {
                     Title:"That's gross",
                     Reference:"random",
                     Event:false
                   },
                ]
              },
              Event:true
              },

              {Title:"Go deeper into subcave 2.",
                         Reference:{
                            Title:"You venture deeper into subcave 2.",
                            Description:"At this depth there's barely any light. You can make out the dim outlines of 2 further subcaves in the distance.",
                            Options:[
                              {Title:"Go deeper into subcave 1.",
                                         Reference:{
                                            Title:"You venture deeper into subcave 1.",
                                            Description:"It's a dead end. You ready your warp gun to leave.",
                                            Options:[
                                              {
                                                Title:"Warp somewhere else",
                                                Reference:"random",
                                                Event:true
                                              },
                                           ]
                                         },
                                         Event:true
                            },
                            {
                              Title: "Go deeper into subcave 2.",
                              Reference:
                                {Title:"Go deeper into subcave 1",
                                 Reference:{
                                    Title:"You find a cave monster waiting for you.",
                                    Description:"He takes a good look at you and starts licking his lips.",
                                    Options:[
                                      {
                                        Title:"That's gross",
                                        Reference:"random",
                                        Event:false
                                      },
                                   ]
                                 },
                                 Event:true
                               },
                               Event: false
                              }


                           ]
                         },
                         Event:true
            },

            ],
     Event:true
  },
  
]

export default events;
