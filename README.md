# Jeff: the LLM-powered Drone Personal Assistant

https://youtu.be/oR7R8wydCEQ

## Inspiration

Drones shouldn't be impersonal, scary, and industrial. We envisioned Jeff as a friendly and creative alternative to most enterprise and defense drone applications. We believe in a future where everyone has a personal assistant and friend on call to make their lives a little easier. So why not use a drone?

## What it does

Jeff is a personal assistant drone that hovers around its companion, listens, and performs tasks on command. With Jeff, you always have a camera-man at the ready to take shots from a variety of heights. Jeff can record a 3rd-person view to give content creators a novel "video-game" camera angle. Just open the app and say, "Hey Jeff, take a video of me from above."

Jeff can also keep you entertained through witty comments, music, and impromptu spins.

## How we built it

We used the Parrot ANAFI AI drone and corresponding Olympe SDK to write Jeff's core functions in a Python Flask server. Then, we designed and wrote an iOS app in React Native to act as the voice-powered LLM interface to Jeff's functions. We used Convex to store and retrieve data and OpenAI function calling to interact with our Flask server.

## Challenges we ran into

As this was our first time working with drones and the Olympe SDK, we faced numerous challenges setting up our development environment, correctly writing functions for the drone, and integrating all the features on our roadmap. Deep into Saturday night, the drone mysteriously disappeared only to reappear miraculously a few hours later. 

## Accomplishments that we're proud of

We're proud that we learned a new tech stack, as none us our team had worked with drones before. We spent lots of time working with the Olympe SKD, debugging, and testing drone functions on the Parrot simulator. We're proud that we executed on our vision to ship a unique demo.

## What we learned

We learned about the challenges of writing software for drones, faced interesting network / systems issues, and how to integrate LLMs into hardware applications.

## What's next for Jeff: the LLM-powered Drone Personal Assistant

We'd love Jeff to have a swarm of drone friends that can provide more dynamic filming, display shapes in the sky, or carry small packages for you.
