//Template for events
/*
{
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
                                {
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
                               Event: true
                              }


                           ]
                         },
                         Event:true
            },

            ],
     Event:true
  },
  {
    Title:"The smell of death...",
    Description:"The portal opens, and you're met with the stench of human flesh. Looks like you had the misfortune of"+
    " warping into one of the more chaotic parts of the multiverse...The doors before you are adorned "+
    "with what appears to be the entrails of whoever came before you.",
    Options: [{Title:"Enter the door with a human heart stapled into it.",
               Reference:{
                 Title:"You open the heart door.",
                 Description:"After rubbing the blood off of your hands, you're pleased to see that the room's empty. You wait for your portal gun to recharge and then ready yourself to leave.",
                 Options:[
                   {
                     Title:"Leave",
                     Reference:"random",
                    Event:true
                   }
                 ]
               },
               Event:true
             },

             {Title:"Enter the door with a human liver stapled into it.",
                        Reference:{
                          Title:"You open the liver door",
                          Description:"You enter the room and it's quiet...too quiet..."+
                          "Suddenly, a ghoul materializes before you, human entrails hung around its neck like a scarf.",
                          Options:[
                            {
                              Title:"Fight for your life",
                              Reference:"random",
                             Event:false
                            }
                          ]
                        },
                        Event:true
                      },
           ]

  },
  {
  Title:"You're warped into Facebook headquarters.",
  Description:"Mark zuckerberg is making intense eye contact with you.",
  Options: [{Title:"Say hi to Mark.",
             Reference:{
               Title:"You greet Mark.",
               Description:"He responds to your greeting with a reptilian scream - REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE. You reach for your weapon and fire at him, but he dematerializes as soon as you pull the trigger, leaving his shedded scaly skin behind. In his place, one of his henchmen appears and starts to swing at you.",
               Options:[
                 {
                   Title:"ZUCK!!!!!",
                   Reference:"random",
                  Event:false
                 }
               ]
             },
             Event:true
           },
           {Title:"Don't say anything. Reptiles can't see you if you stay still.",
                      Reference:{
                        Title:"You stand as still as possible.",
                        Description:"Your hypothesis turned out to be correct. The scaly CEO stares past you as if looking into empty space, and then leaves. You hastily ready your warp gun.",
                        Options:[
                          {
                            Title:"Leave",
                            Reference:"random",
                           Event:true
                          }
                        ]
                      },
                      Event:true
                    }
          ]
  },
  {
  Title:"Intergalactic war",
  Description:"You hear a rocket whistle past your ear as you exit the portal - this section of the multiverse is experiencing a civil war! You'll have to fend for yourself long enough for your warp gun to recharge. ",
  Options: [{Title:"Stay in your current position behind cover.",
             Reference:{
               Title:"You stay behind cover.",
               Description:"Suddenly, you hear someone scream 'AIR A FAR GARLAGA!' as they charge your position. The wall that you've been cowering behind crumbles, to reveal your enemy. He accuses you in Farsiligan of being a Aortinian partisan - you hastily try to explain that you're not fighting for either side, but your effort to explain yourself is cut short as he fires two plasma shots into the wall behind you.",
               Options:[
                 {
                   Title:"Fight",
                   Reference:"random",
                  Event:false
                 }
               ]
             },
             Event:true
           },
             {Title:"You're no coward. Into the fray!",
                        Reference:{
                          Title:"You charge into battle.",
                          Description:"You pick up a nearby rifle and load it. Adrenaline pumps through your veins as you fire potshots into the hordes of charging enemies - until you realize you're out of ammo.",
                          Options:[
                            {Title:"Ammo is for pussies - fix bayonets!",
                                       Reference:{
                                         Title:"CHAAAAAAARGE!",
                                         Description:"You pull a bayonet out of a nearby corpse. Screaming at the top of your lungs, you charge a nearby machine gun position - the gunners are so taken aback that they abandon their post. You pick up their machine gun and empty the magazine into their backs. Serves them right for being cowards. By now, your warp gun has recharged - you can continue your journey.",
                                         Options:[
                                           {
                                             Title:"Leave",
                                             Reference:"random",
                                            Event:true
                                           }
                                         ]
                                       },
                                       Event:true
                                     }
                          ],
                          Event:true
                        },
                        Event:true


                  }
                ]


  }

]

export default events;
