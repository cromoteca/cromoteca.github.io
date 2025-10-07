---
title: "Casio FX-880P"
description: "Exploring the Casio FX-880P programmable calculator with hidden BASIC commands, custom character creation, programs including games, and how to connect it to a PC."
category: "technical"
date: "November 2, 2007"
readTime: 6
language: "en"
---

*Note: this article is very old and was part of my website more than ten years ago. I got it back again due to my affection for that wonderful programmable calculator.*

I'd like to share tricks and programs suitable for this excellent pocket computer by CASIO. I've discovered a lot of hidden features of this calculator. Do you want to try some new BASIC commands? These are not documented on the User Manual, but they are extensively used in the Scientific Library. I can also tell you how to connect your calculator to your PC with a few money.

## Programs

Here are some of my programs for the FX-880P.

The first is a game: [The Little Castle](/downloads/fx-880p/castle.zip). It uses the graphics of this calculator over their limits... you will see castles, towers, swordsmen, candles, cars, bats, treasures... you need a little bit of fantasy, this is not a 32-bit 3D Voodoo Graphics action game, but if you like FX-880P, this should be a must for you. If you enjoy this, please let me know your opinions about it. Note: the game is in Italian, but the instructions are in English. Please don't download this game if you have an FX-850P with 8kb of RAM. This is more than 10kb.

The second program is a [Workshop](/downloads/fx-880p/workshop.zip) that could help you if you need to make some calculations with error-propagation. Note: use this program only if you have an FX-880P with 32kb of memory: no FX-850P and no 64kb! This is because this program writes some memory locations with POKE, and these locations are different in other situations. I could port the program, but I couldn't test it. If you have a different configuration, you could help me. The programs and the instructions are both in English. Please feel free to translate them if you want, I only ask to leave my name and my e-mail in the instructions distributed with the program.

## Undocumented Commands

I've found these new commands reading the programs of the scientific library. There are some other documents on the net describing them: this guide tries to explain them in a simple way.

### DEFCHR$

This is a very fun tool, allowing you to create 4 new characters. Try this program:

```basic
10 DEFCHR$(252) = "1824428244"
20 DEFCHR$(253) = "04085C0204"
30 DEFCHR$(254) = "0C120C0204"
40 DEFCHR$(255) = "0C120C00FA"
50 PRINT CHR$(252) + CHR$(253) + CHR$(254)+ CHR$(255)
```

This is a handwritten version of the famous program: "Hello, world!". As you can see, the syntax of this command is very simple. The argument of DEFCHR$ can be any valid expression, but its value is truncated to an integer between 252 and 255 included. These are the only ASCII codes you can modify in FX-880P. The characters can be modified every time you want, even many times in the same program, but if you change a character that is being showed on the display, it will modify immediately (this is also useful to create animations).

To create the string representing the character you want to use, consider this example grid:

![Character creation grid](/images/blog/character.png)

You need to sum the hexadecimal value of each cell, obtaining a two-digit number for each column. The first is 10 + 08 = 18 and so on. The final string is 1824428244.

### INPUT@

This command is like the usual INPUT, but now you can define the maximum length of the input data. Consider this example:

```basic
10 INPUT@4; A$
20 PRINT "You entered: " + A$
```

Try the program entering "hello" to verify the consequence of this command. The syntax can be more complex: you can include a message and multiple input, like this:

```basic
10 INPUT "Enter three numbers "; @4; A, @7; B, C
```

Here you can write 4 digits in A, 7 in B and all the digits you want in C. Try to press CLS while inserting A: only the data you are writing will be erased: you created a window!

### INPUT$

This command is included in the User Manual, but has an undocumented feature. Here is the example used in the User Manual to explain INPUT$, with some little changes:

```basic
10 PRINT : PRINT "Enter secret code";
20 ID$ = INPUT$(4,@)
30 IF ID$ <> "9876" THEN 10
40 PRINT : PRINT "OK"
```

The difference is in hiding the cursor. Unlike using INKEY$, the execution of the program is stopped until you type the exact number of characters.

### CALC$ and CALCJMP

**CALC$**: this is a system variable representing the contents of the function memory. You can always read it, but you can modify it only in the body of a program.

**CALCJMP**: this executes the function memory. In the CAL mode the effect is the same of the CALC key, but you can use it in a program, too.

## Connecting to Your PC

Here is all you need to connect your FX-850P or FX-880P to your PC in a simple way. Note: if you are expert of these things, you can find on the net more detailed information. This is only a simple way to make the connection.

Take a cable like that connecting your printer to the parallel port of your PC. This should have 25 pins on the PC side and 36 pins on the printer side. Open the printer connector and search for the numeration of the pins, from 1 to 36. Write elsewhere the colors of the cables connected to the pins 2, 10, 11 and 19.

The connector of your calculator should have 30 holes:

![FX-880P Connector](/images/blog/connector.png)

You need to take off the 36-pin connector of your cable, so having a lot of little colored wires, but only the four you have written down before needs to be connected to your calculator, with this correspondence:

| PC | 2 | 10 | 11 | 19 |
|----|---|----|----|-----|
| Casio | 5 | 21 | 22 | 30 |

You can easily build a rough connector sticking the four wires up and down on a piece of cardboard. That's all the hardware you need.

The software you must [download](/downloads/fx-880p/casio14.zip) is an editor made especially for the Casio FX-850P and FX-880P by *Felipe Polo Leonor*. It was written in Spanish and I haven't found an English version of it. But using it is straightforward, because it has a familiar MS-DOS interface. The main differences are the commands "Transmitir" and "Recibir" (Send and Receive). You must run this program in the true MS-DOS mode, not in an MS-DOS prompt.

Suppose you have at least a program in your calculator and you have made the connection described above. Now launch the Casio Editor on your PC and choose "Recibir". You will see the instructions you need to follow to put your Casio program into your new editor. Then you could try to send this program to an empty zone on your Casio. If something goes wrong, try slowing the transfer speed in editor preferences. That's all.
