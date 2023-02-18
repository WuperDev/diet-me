
import express from 'express';
const app = express();
const port = 3000;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const meals = [
    {
      "name": "Jogurt z owocami",
      "calories": 178,
      "ingredients": "150 g jogurtu naturalnego\n100 g owoców (np. maliny, jagody, truskawki)\n1 łyżeczka miodu",
      "instructions": "Umieść jogurt w misce.\nDodaj owoce na wierzch jogurtu.\nSkrop całość miodem."
    },
    {
      "name": "Tost z jajkiem sadzonym",
      "calories": 210,
      "ingredients": "1 kromka chleba razowego\n1 jajko\n1 łyżeczka masła",
      "instructions": "Rozgrzej patelnię na średnim ogniu.\nRoztop masło na patelni.\nDodaj jajko i smaż na złoty kolor.\nPodgrzej kromkę chleba.\nPołóż jajko na chlebie."
    },
    {
      "name": "Kanapka z hummusem i warzywami",
      "calories": 195,
      "ingredients": "2 kromki chleba pełnoziarnistego\n50 g hummusu\n50 g warzyw (np. ogórek, papryka, pomidor)",
      "instructions": "Rozsmaruj hummus na kromkach chleba.\nPokrój warzywa i połóż na hummusie.\nZłóż kanapki."
    },
    {
      "name": "Omlet z warzywami",
      "calories": 300,
      "ingredients": "Jajka, cebula, papryka, szpinak",
      "instructions": "1. Ugotuj warzywa na patelni. 2. Wbij jajka i smaż omlet na patelni."
    },
    {
      "name": "Kurczak z ryżem",
      "calories": 400,
      "ingredients": "Kurczak, ryż, warzywa",
      "instructions": "1. Ugotuj kurczaka i ryż. 2. Ugotuj warzywa na patelni."
    },
    {
      "name": "Sałatka z tuńczyka",
      "calories": 200,
      "ingredients": "Tuńczyk, sałata, pomidory, ogórki, oliwa z oliwek",
      "instructions": "1. Wymieszaj tuńczyka, sałatę, pomidory i ogórki. 2. Dodaj oliwę z oliwek."
    },
    {
      "name": "Kanapki z pastą jajeczną",
      "calories": 250,
      "ingredients": "Chleb, jajka, majonez, sól, pieprz",
      "instructions": "1. Ugotuj jajka i zmiksuj z majonezem, solą i pieprzem. 2. Nasmaruj pastą jajeczną na kromki chleba."
    },
    {
      "name": "Pizza Margherita",
      "calories": 550,
      "ingredients": "Ciasto na pizzę, sos pomidorowy, mozzarella, bazylia",
      "instructions": "1. Uformuj ciasto na pizzę i wylej sos pomidorowy. 2. Posyp startą mozzarellą i posiekaną bazylią. 3. Piecz w piekarniku."
    },
    {
      "name": "Makaron z sosem pomidorowym",
      "calories": 350,
      "ingredients": "Makaron, sos pomidorowy, cebula, czosnek, bazylia",
      "instructions": "1. Ugotuj makaron. 2. Ugotuj sos pomidorowy z cebulą, czosnkiem i bazylią. 3. Połącz makaron z sosem."
    },
    {
      "name": "Sałatka z krewetkami",
      "calories": 508,
      "ingredients": "150 g krewetek\n50 g mixu sałat\n1/2 awokado\n1/2 papryki czerwonej\n1/2 cebuli czerwonej\n1 łyżka oliwy z oliwek\n1 łyżka soku z cytryny",
      "instructions": "Oczyść krewetki i ugotuj na patelni z odrobiną oliwy z oliwek.\nUmyj i osusz sałatę, umieść ją na talerzu.\nPokrój awokado, cebulę i paprykę w kostkę, dodaj do sałaty.\nDodaj ugotowane krewetki.\nSkrop całość oliwą z oliwek i sokiem z cytryny."
    },
    {
      "name": "Pierś z kurczaka z ryżem i warzywami",
      "calories": 524,
      "ingredients": "1 filet z kurczaka\n50 g ryżu brązowego\n50 g marchewki\n50 g cukinii\n1 łyżka oleju rzepakowego\nsól, pieprz",
      "instructions": "Ugotuj ryż zgodnie z instrukcją na opakowaniu.\nPokrój marchewkę i cukinię w paski.\nFilet z kurczaka posól i popieprz, a następnie usmaż na patelni z odrobiną oleju.\nDodaj pokrojone warzywa i smaż na patelni przez około 5 minut.\nPodawaj z ugotowanym ryżem."
    },
    {
      "name": "Koktajl z bananem i awokado",
      "calories": 484,
      "ingredients": "1 banana\n1/2 awokado\n200 ml mleka migdałowego\n2 łyżki płatków owsianych\n1 łyżka miodu",
      "instructions": "Obierz banana i awokado i umieść je w blenderze.\nDodaj mleko migdałowe, płatki owsiane i miód.\nZmiksuj wszystkie składniki na gładką masę.\nPodaj w wysokim szklankach."
    },
    {
      "name": "Kuskus z warzywami i fetą",
      "calories": 591,
      "ingredients": "120 g kuskusu\n1/2 cukinii\n1/2 papryki\n1/2 cebuli\n50 g sera feta\n1 łyżka oliwy z oliwek\nsól, pieprz",
      "instructions": "Kuskus zalej wrzącą wodą zgodnie z instrukcją na opakowaniu i odstaw na 10 minut.\nCebulę pokrój w drobną kostkę, a cukinię i paprykę w paski.\nNa patelni rozgrzej oliwę i smaż warzywa przez około 5 minut.\nDodaj kuskus i smaż jeszcze przez 2-3 minuty.\nDodaj pokruszoną fetę i wymieszaj całość."
    },
    {
      "name": "Kanapki z jajkiem sadzonym i szynką",
      "calories": 607,
      "ingredients": "2 jajka\n2 kromki chleba tostowego\n2 plasterki szynki\n1 łyżka masła\nsól, pieprz",
      "instructions": "Na patelni rozgrzej masło.\nRozbij jajka na patelni i smaż na małym ogniu, aż białko będzie ścięte, a żółtko płynne.\nChleb tostowy opiecz w tosterze lub na patelni.\nNa jednej kromce chleba połóż plasterki szynki, a następnie jajko.\nPrzypraw solą i pieprzem i przykryj drugą kromką chleba."
    },
    {
      "name": "Zapiekanka ziemniaczana z boczkiem",
      "calories": 598,
      "ingredients": "500 g ziemniaków\n200 g boczku wędzonego\n1/2 cebuli\n2 ząbki czosnku\n100 ml śmietany\n100 g sera żółtego\n1 łyżka masła\nsól, pieprz",
      "instructions": "Ziemniaki obierz, pokrój w plastry i ugotuj w osolonej wodzie.\nBoczek pokrój w kostkę i podsmaż na patelni.\nCebulę i czosnek posiekaj i dodaj do boczku. Smaż przez około 5 minut.\nW małym garnku podgrzej śmietanę.\nDo naczynia żaroodpornego włoż kolejno ziemniaki, boczek z cebulą i czosnkiem, a następnie wlej śmietanę.\nPosyp startym serem i wstaw do piekarnika nagrzanego do 200°C na około 20 minut."
    }
  ]
  

app.get('/meals', (req, res) => {
  res.json(meals);
});

app.listen(port, () => {
  console.log(`API dostępne pod adresem http://localhost:${port}`);
});