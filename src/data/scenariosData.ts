import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  // ================= A1 =================
  {
    id: 'a1-bakery',
    title: 'Beim Bäcker',
    englishTitle: 'At the Traditional Bakery',
    level: 'A1',
    category: 'daily',
    icon: 'Croissant',
    location: 'Berlin-Kreuzberg, Bäckerei Müller',
    description: 'Order fresh bread rolls, pretzels, and a coffee in authentic German bakery style.',
    userRole: 'Customer ordering morning breakfast',
    partnerRole: 'Bäckereiverkäuferin (Bakery clerk)',
    partnerAvatar: '👩‍🍳',
    vocabularyGoals: ['die Brötchen', 'die Brezel', 'der Kaffee', 'sonst noch etwas', 'zum Mitnehmen'],
    grammarFocus: 'Polite ordering with "Ich möchte..." and "Ich hätte gerne..."',
    englishSpeakerTip: 'Never say "Can I have...?" translated literally as "Kann ich haben?". Instead say "Ich hätte gern..." or "Ich möchte bitte...". Also notice "Brötchen" in Berlin can be "Schrippen" and in Bavaria "Semmeln"!',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Guten Morgen! Was darf es denn für Sie sein?',
        partnerPromptEn: 'Good morning! What can I get for you?',
        expectedUserConceptDe: 'Zwei Brötchen und eine Brezel bestellen',
        expectedUserConceptEn: 'Order two rolls and one pretzel',
        suggestedPhrases: [
          { de: 'Guten Morgen! Ich hätte gerne zwei Brötchen und eine Brezel, bitte.', en: 'Good morning! I would like two rolls and a pretzel, please.' },
          { de: 'Hallo! Ich möchte bitte zwei normale Brötchen.', en: 'Hello! I would like two plain bread rolls, please.' },
          { de: 'Guten Tag! Haben Sie noch frische Laugenbrezeln?', en: 'Good day! Do you still have fresh pretzels?' }
        ],
        culturalNote: 'In Germany, bakeries are daily institutions. Greeting with "Guten Morgen" is expected before ordering.',
        grammarFocus: 'Konjunktiv II for politeness: "hätte gerne" (would like to have).'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Sehr gerne. Kommt noch etwas dazu? Vielleicht ein Kaffee?',
        partnerPromptEn: 'With pleasure. Anything else? Maybe a coffee?',
        expectedUserConceptDe: 'Einen Kaffee zum Mitnehmen bestellen',
        expectedUserConceptEn: 'Order a coffee to go',
        suggestedPhrases: [
          { de: 'Ja bitte, einen großen Cappuccino zum Mitnehmen.', en: 'Yes please, a large cappuccino to take away.' },
          { de: 'Ja, einen Kaffee mit Milch und Zucker bitte.', en: 'Yes, a coffee with milk and sugar please.' },
          { de: 'Nein danke, das ist alles für heute.', en: 'No thank you, that is all for today.' }
        ],
        culturalNote: '"Zum Mitnehmen" means takeaway/to-go, while "hier trinken" means for here.',
        grammarFocus: 'Akkusativ case for direct object: "einen Kaffee" (masculine der Kaffee -> einen Kaffee).'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Das macht dann 4 Euro 80. Zahlen Sie bar oder mit Karte?',
        partnerPromptEn: 'That will be 4 euros 80. Are you paying cash or by card?',
        expectedUserConceptDe: 'Zahlungsart angeben',
        expectedUserConceptEn: 'State payment method',
        suggestedPhrases: [
          { de: 'Mit Karte, bitte.', en: 'By card, please.' },
          { de: 'Ich zahle bar. Hier sind 5 Euro, stimmt so.', en: 'I pay cash. Here are 5 euros, keep the change.' },
          { de: 'Geht auch kontaktlos?', en: 'Does contactless work as well?' }
        ],
        culturalNote: '"Stimmt so!" is the classic German way to say "Keep the change!". While card payments are rising, cash (Bargeld) remains deeply loved in Germany.',
        grammarFocus: 'Preposition "mit" always takes the Dativ case ("mit Karte").'
      }
    ]
  },
  {
    id: 'a1-train-ticket',
    title: 'Am Fahrkartenschalter',
    englishTitle: 'At the Train Ticket Counter',
    level: 'A1',
    category: 'travel',
    icon: 'Train',
    location: 'München Hauptbahnhof',
    description: 'Buy a regional train ticket, ask about platform and departure times.',
    userRole: 'Traveler heading to Salzburg',
    partnerRole: 'Bahnbeamter (DB Service Agent)',
    partnerAvatar: '👨‍✈️',
    vocabularyGoals: ['die Fahrkarte', 'das Gleis', 'die Abfahrt', 'hin und zurück', 'einfach'],
    grammarFocus: 'Modal verbs (möchten/können) and time questions with "Wann fährt..."',
    englishSpeakerTip: 'English speakers often confuse "Gleis" (track/platform number in German) with "Bahnsteig" (the physical platform). The train leaves from "Gleis 11".',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Hallo! Wie kann ich Ihnen helfen?',
        partnerPromptEn: 'Hello! How can I help you?',
        expectedUserConceptDe: 'Fahrkarte nach Salzburg verlangen',
        expectedUserConceptEn: 'Ask for a ticket to Salzburg',
        suggestedPhrases: [
          { de: 'Guten Tag, ich möchte eine Fahrkarte nach Salzburg, bitte.', en: 'Good day, I would like a train ticket to Salzburg, please.' },
          { de: 'Hallo, wann fährt der nächste Zug nach Salzburg?', en: 'Hello, when does the next train to Salzburg depart?' },
          { de: 'Ich brauche ein Ticket für zwei Personen nach Salzburg.', en: 'I need a ticket for two people to Salzburg.' }
        ],
        culturalNote: 'DB offers regional tickets like "Bayern-Ticket" which give huge group discounts across Bavaria and even to Salzburg.',
        grammarFocus: 'Direction preposition "nach" is used for cities and countries without article ("nach Salzburg", "nach Deutschland").'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Möchten Sie eine einfache Fahrt oder hin und zurück?',
        partnerPromptEn: 'Would you like a one-way trip or return?',
        expectedUserConceptDe: 'Hin- und Rückfahrt wählen',
        expectedUserConceptEn: 'Choose round trip',
        suggestedPhrases: [
          { de: 'Hin und zurück, bitte. Ich fahre heute Abend zurück.', en: 'Return, please. I am returning this evening.' },
          { de: 'Nur eine einfache Fahrt, bitte.', en: 'Just a one-way trip, please.' },
          { de: 'Gibt es dafür ein Sparticket oder Tagesticket?', en: 'Is there a saver ticket or day ticket for that?' }
        ],
        culturalNote: '"Einfache Fahrt" = one-way. "Hin und zurück" = there and back (round-trip).',
        grammarFocus: 'Separable verb "zurückfahren": "Ich fahre heute Abend zurück."'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Der nächste Regional-Express fährt um 10:15 Uhr von Gleis 11 ab.',
        partnerPromptEn: 'The next Regional Express departs at 10:15 AM from track 11.',
        expectedUserConceptDe: 'Sich bedanken und gute Reise wünschen',
        expectedUserConceptEn: 'Say thanks and ask about changes',
        suggestedPhrases: [
          { de: 'Vielen Dank! Muss ich umsteigen?', en: 'Thank you very much! Do I have to transfer trains?' },
          { de: 'Perfekt, danke schön! Schönen Tag noch!', en: 'Perfect, thank you! Have a nice day!' },
          { de: 'Ist die Sitzplatzreservierung inklusive?', en: 'Is seat reservation included?' }
        ],
        culturalNote: 'In regional trains (RE, RB, S-Bahn), reservations are not possible. In ICE trains, they are optional but recommended.',
        grammarFocus: 'Verb "umsteigen" (to change trains) is separable: "Muss ich umsteigen?"'
      }
    ]
  },

  // ================= A2 =================
  {
    id: 'a2-restaurant',
    title: 'Im Restaurant',
    englishTitle: 'Dining at a German Restaurant',
    level: 'A2',
    category: 'food',
    icon: 'Utensils',
    location: 'Köln, Gasthaus zum Löwen',
    description: 'Ask for recommendations, clarify ingredients, and ask to split the bill.',
    userRole: 'Guest dining with a friend',
    partnerRole: 'Kellner (Waiter)',
    partnerAvatar: '🤵',
    vocabularyGoals: ['die Speisekarte', 'die Empfehlung', 'die Rechnung', 'getrennt zahlen', 'vegetarisch'],
    grammarFocus: 'Akkusativ vs Dativ in ordering; polite modal verbs; asking for the bill.',
    englishSpeakerTip: 'In Germany, waiters do NOT automatically bring the check to your table because it is considered rude (like kicking you out). You must actively ask: "Zahlen, bitte!" or "Können wir bitte zahlen?".',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Guten Abend! Haben Sie schon einen Tisch reserviert?',
        partnerPromptEn: 'Good evening! Have you already reserved a table?',
        expectedUserConceptDe: 'Tisch für zwei Personen anfragen',
        expectedUserConceptEn: 'Request a table for two',
        suggestedPhrases: [
          { de: 'Nein, wir haben leider nicht reserviert. Haben Sie einen Tisch für zwei frei?', en: 'No, unfortunately we have not reserved. Do you have a table for two free?' },
          { de: 'Guten Abend! Ja, auf den Namen Weber um 19 Uhr.', en: 'Good evening! Yes, under the name Weber at 7 PM.' },
          { de: 'Können wir uns draußen auf die Terrasse setzen?', en: 'Can we sit outside on the terrace?' }
        ],
        culturalNote: 'Reservation culture is strong in German city centers on weekend evenings.',
        grammarFocus: 'Adverbs like "leider" (unfortunately) usually go right after the verb: "Wir haben leider nicht reserviert."'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Nehmen Sie bitte hier Platz. Was darf ich Ihnen zu trinken bringen?',
        partnerPromptEn: 'Please take a seat here. What may I bring you to drink?',
        expectedUserConceptDe: 'Getränke bestellen und nach Empfehlung fragen',
        expectedUserConceptEn: 'Order drinks and ask for recommendation',
        suggestedPhrases: [
          { de: 'Ein großes Mineralwasser ohne Kohlensäure und ein alkoholfreies Bier, bitte.', en: 'A large still mineral water and a non-alcoholic beer, please.' },
          { de: 'Was für einen Weißwein können Sie empfehlen?', en: 'What kind of white wine can you recommend?' },
          { de: 'Ich nehme ein Glas Apfelschorle, bitte.', en: 'I will take a glass of apple spritzer, please.' }
        ],
        culturalNote: 'In Germany, "Wasser" is carbonated with gas (Sprudel/mit Kohlensäure) by default. If you want tap/still water, you must specify "stilles Wasser". Apfelschorle (apple juice with sparkling water) is the unofficial national soft drink.',
        grammarFocus: 'Verb "nehmen": "Ich nehme ein Glas..." (Akkusativ neuter).'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Hat es Ihnen geschmeckt? Und möchten Sie noch einen Nachtisch?',
        partnerPromptEn: 'Did you enjoy your meal? And would you like a dessert?',
        expectedUserConceptDe: 'Essen loben und die Rechnung verlangen',
        expectedUserConceptEn: 'Praise meal and request bill',
        suggestedPhrases: [
          { de: 'Es war köstlich, vielen Dank! Wir möchten gerne zahlen.', en: 'It was delicious, thank you very much! We would like to pay.' },
          { de: 'Sehr lecker! Können wir bitte die Rechnung haben? Zusammen bitte.', en: 'Very delicious! Could we please have the bill? Together please.' },
          { de: 'Wir möchten bitte zahlen. Getrennt, wenn das möglich ist.', en: 'We would like to pay please. Separately, if that is possible.' }
        ],
        culturalNote: '"Zusammen oder getrennt?" (Together or separately?) is the standard question. Germans often split exactly what each person consumed right at the table.',
        grammarFocus: '"Hat es Ihnen geschmeckt?" uses Dativ pronoun "Ihnen".'
      }
    ]
  },
  {
    id: 'a2-doctor',
    title: 'Beim Arzt in der Praxis',
    englishTitle: 'At the Doctor’s Office',
    level: 'A2',
    category: 'daily',
    icon: 'Stethoscope',
    location: 'Hamburg-Altona, Praxis Dr. Schneider',
    description: 'Describe medical symptoms, fever, sore throat, and ask for a sick note (Krankschreibung).',
    userRole: 'Patient with flu symptoms',
    partnerRole: 'Dr. Schneider (General practitioner)',
    partnerAvatar: '👨‍⚕️',
    vocabularyGoals: ['die Halsschmerzen', 'das Fieber', 'die Krankmeldung', 'das Rezept', 'die Apotheke'],
    grammarFocus: 'Body parts with "mir tut ... weh" (Dativ) and "Ich habe..."',
    englishSpeakerTip: 'To express pain, English says "My throat hurts". German uses the dative structure: "Mir tut der Hals weh" (To me, the throat does hurt) or "Ich habe Halsschmerzen".',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Guten Tag. Nehmen Sie bitte Platz. Was fehlt Ihnen denn?',
        partnerPromptEn: 'Good day. Please take a seat. What seems to be the problem?',
        expectedUserConceptDe: 'Symptome wie Halsschmerzen und Fieber schildern',
        expectedUserConceptEn: 'Describe symptoms like sore throat and fever',
        suggestedPhrases: [
          { de: 'Guten Tag, Herr Doktor. Mir tut der Hals seit zwei Tagen sehr weh und ich habe Fieber.', en: 'Good day, doctor. My throat has been hurting very much for two days and I have a fever.' },
          { de: 'Ich fühle mich seit gestern schlapp und habe starken Husten.', en: 'I have been feeling exhausted since yesterday and have a bad cough.' },
          { de: 'Mein Kopf tut weh und ich kann nachts kaum schlafen.', en: 'My head hurts and I can barely sleep at night.' }
        ],
        culturalNote: '"Was fehlt Ihnen?" literally means "What is missing to you?", the idiomatic German way a doctor asks "What is wrong?".',
        grammarFocus: 'Structure: "Mir tut [der Kopf / der Hals] weh" vs plural "Mir tun [die Ohren] weh".'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Ich schaue mir Ihren Hals an. Machen Sie bitte den Mund auf und sagen Sie "Aah". Ja, die Mandeln sind gerötet. Haben Sie Allergien gegen Penicillin?',
        partnerPromptEn: 'I will look at your throat. Please open your mouth and say "Ah". Yes, the tonsils are red. Do you have any allergies against penicillin?',
        expectedUserConceptDe: 'Auf Allergiefrage antworten',
        expectedUserConceptEn: 'Answer allergy question',
        suggestedPhrases: [
          { de: 'Nein, ich habe keine bekannten Allergien.', en: 'No, I have no known allergies.' },
          { de: 'Ja, ich vertrage kein Penicillin. Gibt es eine Alternative?', en: 'Yes, I cannot tolerate penicillin. Is there an alternative?' },
          { de: 'Soweit ich weiß, habe ich keine Medikamentenallergie.', en: 'As far as I know, I have no medication allergy.' }
        ],
        culturalNote: 'German doctors are quite conservative with antibiotics and will often suggest herbal teas, sage (Salbei), or salt water gargles alongside medication.',
        grammarFocus: 'Preposition "gegen" always takes Akkusativ: "Allergie gegen Penicillin".'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Ich schreibe Ihnen ein Rezept für Halstabletten auf. Brauchen Sie auch eine Arbeitsunfähigkeitsbescheinigung für Ihren Arbeitgeber?',
        partnerPromptEn: 'I will write you a prescription for throat lozenges. Do you also need a certificate of incapacity for work for your employer?',
        expectedUserConceptDe: 'Krankschreibung annehmen',
        expectedUserConceptEn: 'Accept sick note',
        suggestedPhrases: [
          { de: 'Ja bitte, ich brauche eine Krankschreibung bis Freitag.', en: 'Yes please, I need a sick note until Friday.' },
          { de: 'Vielen Dank. Wird das elektronisch an meine Krankenkasse übermittelt?', en: 'Thank you very much. Is that transmitted electronically to my health insurance?' },
          { de: 'Ja danke, mein Chef braucht das ab dem ersten Tag.', en: 'Yes thank you, my boss needs it from day one.' }
        ],
        culturalNote: 'In Germany, the "eAU" (elektronische Arbeitsunfähigkeitsbescheinigung) is now sent digitally to employers, but doctors still give you a copy.',
        grammarFocus: 'Compound noun power: "die Arbeitsunfähigkeitsbescheinigung" (work incapacity certificate).'
      }
    ]
  },

  // ================= B1 =================
  {
    id: 'b1-flat-viewing',
    title: 'Wohnungsbesichtigung',
    englishTitle: 'Apartment Viewing in Munich',
    level: 'B1',
    category: 'daily',
    icon: 'Home',
    location: 'München-Schwabing',
    description: 'Inspect a rental apartment, ask about Warmmiete, Kaution, neighbors, and submit your application.',
    userRole: 'Prospective tenant looking for a 2-room flat',
    partnerRole: 'Herr Brandstetter (Vermieter / Landlord)',
    partnerAvatar: '🏢',
    vocabularyGoals: ['die Kaltmiete', 'die Warmmiete', 'die Kaution', 'die Nebenkosten', 'die Hausordnung'],
    grammarFocus: 'Subordinate clauses with "ob", "weil", and "dass" (verb kicks to the end).',
    englishSpeakerTip: 'Crucial distinction for living in Germany: "Kaltmiete" is rent without heating/water/trash, while "Warmmiete" includes estimates for heating & operating costs ("Nebenkosten"). Also notice the verb goes to the END of subordinate clauses (*weil die Wohnung so hell ist*).',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Grüß Gott! Schön, dass Sie pünktlich sind. Das ist die 2-Zimmer-Wohnung mit 65 Quadratmetern. Wie gefällt Ihnen der Schnitt?',
        partnerPromptEn: 'Hello! Great that you are on time. This is the 2-room apartment with 65 square meters. How do you like the layout?',
        expectedUserConceptDe: 'Wohnung loben und nach Balkon oder Ausrichtung fragen',
        expectedUserConceptEn: 'Compliment flat and ask about balcony or orientation',
        suggestedPhrases: [
          { de: 'Guten Tag Herr Brandstetter! Der Schnitt gefällt mir sehr gut, weil das Wohnzimmer so schön hell ist.', en: 'Good day Mr. Brandstetter! I like the layout very much because the living room is so wonderfully bright.' },
          { de: 'Grüß Gott! Die hohen Decken sind wunderschön. Liegt der Balkon nach Süden?', en: 'Hello! The high ceilings are gorgeous. Does the balcony face south?' },
          { de: 'Der erste Eindruck ist wirklich hervorragend. Ist die Einbauküche in der Miete enthalten?', en: 'The first impression is truly outstanding. Is the fitted kitchen included in the rent?' }
        ],
        culturalNote: 'Punctuality in Germany (especially for apartment viewings with 30+ applicants) is paramount. Being 2 minutes early is considered on time.',
        grammarFocus: 'Subordinate clause word order: "weil das Wohnzimmer so schön hell IST" (verb at the end).'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Ja, die Einbauküche gehört zur Wohnung. Die Kaltmiete beträgt 950 Euro, die Nebenkosten liegen bei 220 Euro. Haben Sie Haustiere oder spielen Sie ein lautes Instrument?',
        partnerPromptEn: 'Yes, the fitted kitchen belongs to the flat. The base rent is 950 euros, operating costs are at 220 euros. Do you have pets or play a loud instrument?',
        expectedUserConceptDe: 'Haustiere/Lärm verneinen und ruhiges Wohnen betonen',
        expectedUserConceptEn: 'Deny pets/noise and emphasize quiet living',
        suggestedPhrases: [
          { de: 'Nein, ich habe keine Haustiere und bin Nichtraucher. Ein ruhiges Wohnumfeld ist mir sehr wichtig.', en: 'No, I have no pets and am a non-smoker. A quiet living environment is very important to me.' },
          { de: 'Weder noch. Ich arbeite als Software-Ingenieur, meistens tagsüber im Homeoffice.', en: 'Neither. I work as a software engineer, mostly during the day in home office.' },
          { de: 'Keine Sorge, ich lebe sehr ruhig und halte mich stets an die Hausordnung.', en: 'No worries, I live very quietly and always adhere to house rules.' }
        ],
        culturalNote: '"Hausordnung" and "Ruhezeiten" (quiet hours, typically 22:00 to 06:00 and all day Sunday) are taken very seriously in German apartment buildings.',
        grammarFocus: 'Correlative conjunction: "weder ... noch" (neither ... nor).'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Das klingt schon mal sehr positiv. Die Kaution beträgt drei Monatskaltmieten. Haben Sie Ihre Bewerbungsmappe mit Schufa-Auskunft und Gehaltsnachweisen dabei?',
        partnerPromptEn: 'That sounds very positive. The deposit is three months base rent. Do you have your application folder with credit report and salary slips with you?',
        expectedUserConceptDe: 'Vollständige Unterlagen überreichen',
        expectedUserConceptEn: 'Hand over complete documents',
        suggestedPhrases: [
          { de: 'Ja selbstverständlich, hier ist meine vollständige Mappe mit Schufa, Selbstauskunft und den letzten drei Gehaltsnachweisen.', en: 'Yes of course, here is my complete portfolio with Schufa, disclosure, and the last three pay slips.' },
          { de: 'Ich habe alles ausgedruckt und kann Ihnen die Unterlagen auch sofort als PDF mailen.', en: 'I printed everything out and can also email you the documents immediately as PDF.' },
          { de: 'Alles liegt bereit. Bis wann können wir mit einer Entscheidung rechnen?', en: 'Everything is ready. By when can we expect a decision?' }
        ],
        culturalNote: 'The "SCHUFA-Auskunft" is the universal credit score report in Germany needed for renting, phone contracts, and loans.',
        grammarFocus: 'Genitiv / Plural possessive: "drei Monatskaltmieten" / "den letzten drei Gehaltsnachweisen" (Dativ plural).'
      }
    ]
  },
  {
    id: 'b1-train-delay',
    title: 'Deutsche Bahn Verspätung',
    englishTitle: 'Navigating Train Delays & Missed Connections',
    level: 'B1',
    category: 'travel',
    icon: 'ClockAlert',
    location: 'Frankfurt (Main) Hauptbahnhof',
    description: 'Handle a cancelled ICE train, inquire about alternative connections, and get delay compensation certificate.',
    userRole: 'Passenger stranded due to signal malfunction',
    partnerRole: 'Frau Krüger (DB Information desk)',
    partnerAvatar: '👩‍💼',
    vocabularyGoals: ['die Verspätung', 'der Zugausfall', 'der Anschlusszug', 'die Fahrgastrechte', 'die Entschädigung'],
    grammarFocus: 'Indirect questions with "Könnten Sie mir sagen, ob/wann..." and past tense (Perfekt).',
    englishSpeakerTip: 'Classic German life reality: "Signalstörung" (signal fault) or "Verzögerungen im Betriebsablauf". English speakers often say "I missed the train", but in German you say "Ich habe den Zug verpasst" or "Mein Anschluss ist weg".',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'DB Information Frankfurt. Guten Tag, wie kann ich Ihnen behilflich sein?',
        partnerPromptEn: 'DB Information Frankfurt. Good day, how may I assist you?',
        expectedUserConceptDe: 'Erklären, dass der ICE nach Köln ausfällt',
        expectedUserConceptEn: 'Explain that the ICE to Cologne is cancelled',
        suggestedPhrases: [
          { de: 'Guten Tag. Mein ICE 528 nach Köln fällt leider aus. Können Sie mir sagen, welche Alternative ich nehmen kann?', en: 'Good day. My ICE 528 to Cologne is unfortunately cancelled. Can you tell me which alternative I can take?' },
          { de: 'Hallo! Wegen der Stellwerkstörung habe ich meinen Anschlusszug verpasst. Was mache ich jetzt?', en: 'Hello! Because of the interlocking malfunction I missed my connection train. What do I do now?' },
          { de: 'Mein Zug hat über 70 Minuten Verspätung. Ist meine Zugbindung jetzt aufgehoben?', en: 'My train has over 70 minutes delay. Is my train-specific ticket binding now lifted?' }
        ],
        culturalNote: 'When a German train is delayed by more than 20 minutes, the "Zugbindung" (requirement to take a specific train on discount tickets) is automatically lifted!',
        grammarFocus: 'Genitive preposition "wegen" ("wegen der Stellwerkstörung"). Indirect question with verb at end.'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Ja, bei dieser Verspätung ist die Zugbindung aufgehoben. Sie können in 15 Minuten den ICE 624 von Gleis 7 nehmen. Sie müssen allerdings in Koblenz umsteigen.',
        partnerPromptEn: 'Yes, with this delay the ticket binding is lifted. You can take ICE 624 from platform 7 in 15 minutes. However, you will have to change trains in Koblenz.',
        expectedUserConceptDe: 'Nach Sitzplatzreservierung und Bestätigung fragen',
        expectedUserConceptEn: 'Ask about seat reservation and confirmation',
        suggestedPhrases: [
          { de: 'Verstehe. Kann meine Sitzplatzreservierung auf den neuen Zug umgebucht werden?', en: 'I understand. Can my seat reservation be rebooked to the new train?' },
          { de: 'Reicht die Umsteigezeit in Koblenz aus, um den Anschluss zu erreichen?', en: 'Is the transfer time in Koblenz sufficient to catch the connection?' },
          { de: 'Muss ich ein neues Ticket kaufen oder gilt mein altes Ticket weiterhin?', en: 'Do I have to buy a new ticket or does my old ticket continue to be valid?' }
        ],
        culturalNote: 'Transfer times under 8 minutes in major German stations during disruptions are notoriously risky.',
        grammarFocus: 'Passive voice with modal verb: "Kann umgebucht werden?"'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Ihr altes Ticket ist voll gültig. Hier ist ein Stempel zur Bestätigung. Und hier ist das Fahrgastrechte-Formular für 25 % Erstattung.',
        partnerPromptEn: 'Your old ticket is fully valid. Here is a stamp for confirmation. And here is the passenger rights form for 25% refund.',
        expectedUserConceptDe: 'Bedanken und nach Online-Erstattung fragen',
        expectedUserConceptEn: 'Thank and ask about online refund',
        suggestedPhrases: [
          { de: 'Vielen Dank für Ihre Hilfe! Kann ich den Antrag auch in der DB Navigator App stellen?', en: 'Thank you very much for your help! Can I also submit the claim in the DB Navigator app?' },
          { de: 'Herzlichen Dank! Dann mache ich mich gleich auf den Weg zu Gleis 7.', en: 'Warm thanks! Then I will head immediately over to platform 7.' },
          { de: 'Super, vielen Dank für die freundliche Auskunft trotz des Chaos.', en: 'Great, thanks a lot for the friendly information despite the chaos.' }
        ],
        culturalNote: 'Germans frequently use the phrase "Trotz des Chaos" (despite the chaos) when dealing with transport snags.',
        grammarFocus: 'Reflexive idiom: "sich auf den Weg machen" (to set off/head over).'
      }
    ]
  },

  // ================= B2 =================
  {
    id: 'b2-job-interview',
    title: 'Bewerbungsgespräch',
    englishTitle: 'Professional Job Interview in Frankfurt',
    level: 'B2',
    category: 'work',
    icon: 'Briefcase',
    location: 'Frankfurt am Main, FinTech Startup',
    description: 'Present professional qualifications, discuss conflict resolution, and articulate salary expectations.',
    userRole: 'Candidate applying for Senior Project Lead',
    partnerRole: 'Frau Dr. Weimann (Head of Talent)',
    partnerAvatar: '👩‍💼',
    vocabularyGoals: ['die Berufserfahrung', 'die Herausforderung', 'die Teamfähigkeit', 'die Gehaltsvorstellung', 'die Weiterbildung'],
    grammarFocus: 'Konjunktiv II for hypothetical scenarios; advanced connectors (zwar ... aber, sowohl ... als auch).',
    englishSpeakerTip: 'In German interviews, modesty combined with concrete factual evidence is expected. English hyperbolic words like "amazing" or "insane results" sound unprofessional; instead use "messbare Erfolge" (measurable successes) or "effiziente Umsetzung" (efficient execution).',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Herzlich willkommen, schön dass Sie da sind! Erzählen Sie uns doch bitte kurz von Ihrem bisherigen Werdegang und was Sie an dieser Position besonders reizt.',
        partnerPromptEn: 'A warm welcome, great to have you here! Please tell us briefly about your career path to date and what particularly attracts you to this position.',
        expectedUserConceptDe: 'Berufliche Erfahrung und Motivation prägnant darstellen',
        expectedUserConceptEn: 'Succinctly present work experience and motivation',
        suggestedPhrases: [
          { de: 'Vielen Dank für die Einladung. In den letzten fünf Jahren habe ich komplexe Softwareprojekte geleitet und dabei sowohl agile Teams geführt als auch agile Transformationsprozesse begleitet.', en: 'Thank you very much for the invitation. Over the past five years I have led complex software projects, guiding agile teams as well as accompanying agile transformation processes.' },
          { de: 'Mich reizt an dieser Stelle vor allem die Schnittstelle zwischen technischer Innovation und internationaler Teamführung.', en: 'What appeals to me most about this role is the intersection between technical innovation and international team leadership.' },
          { de: 'Ich habe in den vergangenen Jahren gelernt, auch unter hohem Termindruck pragmatische und skalierbare Lösungen zu entwickeln.', en: 'In recent years I have learned to develop pragmatic and scalable solutions even under tight deadlines.' }
        ],
        culturalNote: 'In Germany, career resumes (Lebenslauf) are historically structured chronologically without gaps ("lückenlos"). Answering with structured milestones is appreciated.',
        grammarFocus: 'Two-part conjunction: "sowohl ... als auch" (both ... as well as).'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Sehr interessant. Wie gehen Sie denn vor, wenn es im Projektteam zu grundlegenden Meinungsverschiedenheiten bezüglich der Prioritäten kommt?',
        partnerPromptEn: 'Very interesting. How do you proceed when there are fundamental differences of opinion within the project team regarding priorities?',
        expectedUserConceptDe: 'Konstruktives Konfliktmanagement und Konsensfindung erläutern',
        expectedUserConceptEn: 'Explain constructive conflict management and consensus building',
        suggestedPhrases: [
          { de: 'In solchen Situationen suche ich zuerst das direkte Gespräch, um die unterschiedlichen Standpunkte sachlich zu analysieren.', en: 'In such situations, I first seek direct conversation to analyze differing viewpoints objectively.' },
          { de: 'Mir ist Transparenz wichtig: Wir stellen die Argumente den Projektzielen gegenüber und treffen eine datengestützte Entscheidung.', en: 'Transparency is important to me: we weigh the arguments against project objectives and make a data-driven decision.' },
          { de: 'Ich versuche stets, einen tragfähigen Kompromiss zu finden, ohne die Qualitätsstandards aus den Augen zu verlieren.', en: 'I always strive to find a viable compromise without losing sight of quality standards.' }
        ],
        culturalNote: 'The German concept of "Sachlichkeit" (objectivity/fact-orientation) is core to German workplace communication. Focus on facts rather than personal emotions.',
        grammarFocus: 'Infinitive with "zu": "einen tragfähigen Kompromiss zu finden, ohne ... zu verlieren".'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Das deckt sich gut mit unserer Unternehmenskultur. Haben Sie noch offene Fragen an uns, und wie sieht Ihre Gehaltsvorstellung aus?',
        partnerPromptEn: 'That aligns well with our company culture. Do you have any open questions for us, and what are your salary expectations?',
        expectedUserConceptDe: 'Frage zur Teamdynamik stellen und Gehalt als Spanne nennen',
        expectedUserConceptEn: 'Ask about team dynamics and state salary as a range',
        suggestedPhrases: [
          { de: 'Aufgrund meiner Qualifikation und Branchenerfahrung liegt meine Gehaltsvorstellung bei etwa 75.000 bis 80.000 Euro brutto im Jahr.', en: 'Based on my qualifications and industry experience, my salary expectation is around 75,000 to 80,000 euros gross per year.' },
          { de: 'Mich würde interessieren, wie die Einarbeitungsphase in den ersten drei Monaten bei Ihnen konkret gestaltet ist.', en: 'I would be interested to know how the onboarding phase in the first three months is concretely structured here.' },
          { de: 'Welche Weiterbildungsmöglichkeiten bietet Ihr Unternehmen für leitende Angestellte?', en: 'What continuing education opportunities does your company offer for senior employees?' }
        ],
        culturalNote: 'Always state salary in Germany as "brutto pro Jahr" (gross annual salary), never monthly net, because tax brackets vary drastically based on marital status.',
        grammarFocus: 'Preposition "aufgrund" + Genitiv ("Aufgrund meiner Qualifikation").'
      }
    ]
  },

  // ================= C1 (ADVANCED FLUENCY) =================
  {
    id: 'c1-ai-debate',
    title: 'Podiumsdiskussion: KI & Gesellschaft',
    englishTitle: 'Panel Debate: AI & the Future of Society',
    level: 'C1',
    category: 'advanced',
    icon: 'Brain',
    location: 'Berlin, Humboldt-Universität',
    description: 'Engage in sophisticated discourse on artificial intelligence, algorithmic ethics, and economic impact using C1 connectors and compound nouns.',
    userRole: 'Panelist representing ethical technology research',
    partnerRole: 'Prof. Dr. von Stein (Moderator & Philosopher)',
    partnerAvatar: '🎓',
    vocabularyGoals: ['die Zukunftsfähigkeit', 'die Eigenverantwortung', 'unumgänglich', 'nichtsdestotrotz', 'der Paradigmenwechsel'],
    grammarFocus: 'Advanced discourse markers (infolgedessen, wenngleich, geschweige denn), passive alternatives with "lässt sich", and modal particles.',
    englishSpeakerTip: 'At C1 level, vocabulary demands reach 8,000–10,000 words. You must effortlessly weave modal particles (doch, mal, halt, eben, ja) and multi-part connectors (zwar ... aber, nicht nur ... sondern auch, geschweige denn) into complex arguments.',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Manche behaupten, generative künstliche Intelligenz führe unweigerlich zur Entmenschlichung unserer Arbeitswelt. Wie beurteilen Sie diesen vermeintlichen Kulturpessimismus?',
        partnerPromptEn: 'Some claim that generative artificial intelligence inevitably leads to the dehumanization of our working world. How do you assess this purported cultural pessimism?',
        expectedUserConceptDe: 'Differenzierte Haltung einnehmen und Paradigmenwechsel betonen',
        expectedUserConceptEn: 'Take a nuanced stance and emphasize paradigm shift',
        suggestedPhrases: [
          { de: 'Ich halte diese pauschale Untergangsstimmung für verfehlt. Wenngleich tiefgreifende Umbrüche unausweichlich sind, bietet die Technologie doch vor allem enormes Potenzial zur Entlastung von repetitiven Aufgaben.', en: 'I consider this blanket doomsday mood misplaced. Even though profound upheavals are inevitable, the technology nevertheless offers above all enormous potential for relief from repetitive tasks.' },
          { de: 'Es handelt sich zweifelsohne um einen beispiellosen Paradigmenwechsel. Nichtsdestotrotz liegt es in unserer gesellschaftlichen Gestaltungsmacht, regulatorische Leitplanken zu etablieren.', en: 'It is undoubtedly an unprecedented paradigm shift. Nonetheless, it lies within our societal power of design to establish regulatory guardrails.' },
          { de: 'Man darf das Kind nicht mit dem Bade ausschütten: Die Frage ist nicht, ob wir KI nutzen, sondern unter welchen ethischen Prämissen.', en: 'We must not throw the baby out with the bathwater: the question is not whether we use AI, but under which ethical premises.' }
        ],
        culturalNote: '"Kulturpessimismus" is a renowned German cultural phenomenon where society thoroughly questions new technology before adopting it, leading to strong data protection norms (like DSGVO/GDPR).',
        grammarFocus: 'Concessive connector "wenngleich" (although/even though) with subordinate clause verb finality.'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Ein treffender Einwand. Dennoch stellt sich die Frage nach der Haftung: Wer trägt die Verantwortung, wenn autonome Systeme gravierende Fehlentscheidungen treffen?',
        partnerPromptEn: 'An apt objection. Nevertheless, the question of liability arises: who bears the responsibility when autonomous systems make grave erroneous decisions?',
        expectedUserConceptDe: 'Menschliche Letztverantwortung und ethische Sorgfaltspflicht darlegen',
        expectedUserConceptEn: 'Elaborate human ultimate responsibility and ethical duty of care',
        suggestedPhrases: [
          { de: 'Hier lässt sich eine klare Linie ziehen: Die Letztverantwortung muss unabdingbar beim Menschen verbleiben, ganz gleich wie hochentwickelt der Algorithmus agiert.', en: 'A clear line can be drawn here: ultimate responsibility must unconditionally remain with humans, regardless of how sophisticatedly the algorithm operates.' },
          { de: 'Es bedarf einer lückenlosen Dokumentations- und Rechenschaftspflicht entlang der gesamten Wertschöpfungskette.', en: 'There is a need for seamless documentation and accountability duties along the entire value-creation chain.' },
          { de: 'Weder Entwickler noch Anwender dürfen sich hinter der Komplexität neuronaler Netze verschanzen.', en: 'Neither developers nor users may entrench themselves behind the complexity of neural networks.' }
        ],
        culturalNote: 'Compound nouns like "die Letztverantwortung" (ultimate responsibility) and "die Rechenschaftspflicht" (duty of accountability) showcase genuine C1 German precision.',
        grammarFocus: 'Passive alternative with "sich lassen + Infinitiv": "Hier lässt sich eine klare Linie ziehen" (= Hier kann eine klare Linie gezogen werden).'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Ein starkes Schlussplädoyer. Welchen Ratschlag würden Sie jungen Menschen geben, die sich auf diesen rasanten Wandel vorbereiten möchten?',
        partnerPromptEn: 'A strong closing plea. What advice would you give young people who wish to prepare for this rapid change?',
        expectedUserConceptDe: 'Kritisches Denken, Anpassungsfähigkeit und lebenslanges Lernen empfehlen',
        expectedUserConceptEn: 'Recommend critical thinking, adaptability, and lifelong learning',
        suggestedPhrases: [
          { de: 'Fachwissen veraltet heute rasend schnell; was hingegen dauerhaft zählt, sind kritisches Reflexionsvermögen, Empathie und intellektuelle Neugier.', en: 'Specialist knowledge becomes obsolete with breakneck speed today; what counts permanently on the other hand is critical reflection capacity, empathy, and intellectual curiosity.' },
          { de: 'Man sollte Technologie nicht ehrfürchtig bestaunen, sondern ihre Wirkmechanismen fundiert verstehen lernen, um sie souverän mitzugestalten.', en: 'One should not gaze at technology with reverent awe, but learn to fundamentally understand its operational mechanisms in order to confidently help shape it.' },
          { de: 'Resilienz und die Bereitschaft zu lebenslangem Lernen sind das beste Rüstzeug für die Berufswelt von morgen.', en: 'Resilience and the willingness for lifelong learning are the best armor for the professional world of tomorrow.' }
        ],
        culturalNote: 'Educated German discourse ("Bildungssprache") prizes words like "Reflexionsvermögen", "souverän", and "Rüstzeug".',
        grammarFocus: 'Relative clause with preposition: "um sie souverän mitzugestalten" (in order to co-shape it confidently).'
      }
    ]
  },
  {
    id: 'c1-negotiation',
    title: 'Gehalts- & Konditionsverhandlung',
    englishTitle: 'Executive Negotiation & Contract Terms',
    level: 'C1',
    category: 'advanced',
    icon: 'TrendingUp',
    location: 'Zürich / Frankfurt, Executive Boardroom',
    description: 'Master high-stakes business negotiation, diplomatic pushback, and performance incentives.',
    userRole: 'Director candidate negotiating employment terms',
    partnerRole: 'Herr Dr. Lindemann (Managing Director)',
    partnerAvatar: '👔',
    vocabularyGoals: ['das Verhandlungsgeschick', 'die Zielvereinbarung', 'der Gestaltungsspielraum', 'vertretbar', 'in Betracht ziehen'],
    grammarFocus: 'Diplomatic subjunctive (Konjunktiv II), modal particles (durchaus, allenfalls), and high-register idiomatic formulations.',
    englishSpeakerTip: 'Germans negotiate directly but politely. Overly aggressive American-style bravado is counterproductive; instead, ground your demands in tangible benchmarks and market parity.',
    turns: [
      {
        id: 'turn-1',
        partnerPromptDe: 'Wir sind von Ihrem Profil überzeugt. Unser Angebot lautet: 110.000 Euro Fixgehalt sowie ein leistungsorientierter Bonus von bis zu 15 Prozent. Wie steht es um Ihre Zustimmung?',
        partnerPromptEn: 'We are convinced by your profile. Our offer is: 110,000 euros base salary plus a performance-oriented bonus of up to 15 percent. How do you stand regarding your agreement?',
        expectedUserConceptDe: 'Angebot wertschätzen aber diplomatisch nachbessern',
        expectedUserConceptEn: 'Appreciate offer but diplomatically negotiate higher',
        suggestedPhrases: [
          { de: 'Ich schätze Ihr Vertrauen und das solide Fundament dieses Angebots sehr. Angesichts des erweiterten Verantwortungsbereichs halte ich jedoch ein Fixum von 125.000 Euro für angemessen.', en: 'I greatly appreciate your trust and the solid foundation of this offer. In view of the expanded scope of responsibility, however, I consider a base of 125,000 euros to be appropriate.' },
          { de: 'Das ist durchaus eine tragfähige Ausgangsbasis. Allerdings entspricht das Gesamtpaket noch nicht ganz dem aktuellen Marktwert für diese Schlüsselposition.', en: 'That is certainly a viable starting baseline. However, the overall package does not yet quite correspond to current market value for this key position.' },
          { de: 'Wäre es denkbar, die Zielvereinbarungen so zu staffeln, dass bei Übererfüllung ein Bonus von 25 Prozent zum Tragen kommt?', en: 'Would it be conceivable to tier the target agreements such that a bonus of 25 percent comes into effect upon overachievement?' }
        ],
        culturalNote: 'In executive negotiations, "angemessen" (appropriate/fair) is the magical keyword in German.',
        grammarFocus: 'Subjunctive conditional: "Wäre es denkbar..." (Would it be conceivable...).'
      },
      {
        id: 'turn-2',
        partnerPromptDe: 'Beim Fixgehalt haben wir engen Budgetrahmen, aber bezüglich Weiterbildungsbudget, Firmenwagen und Homeoffice-Regelung besteht durchaus Verhandlungsspielraum.',
        partnerPromptEn: 'With the fixed salary we have a tight budget framework, but regarding continuing education budget, company car, and home-office policy there is certainly room for negotiation.',
        expectedUserConceptDe: 'Zusatzleistungen wie Mobilitätsbudget und Fortbildung verhandeln',
        expectedUserConceptEn: 'Negotiate fringe benefits like mobility budget and executive coaching',
        suggestedPhrases: [
          { de: 'Wenn das Fixgehalt budgetär gedeckelt ist, käme mir ein substanzielles Weiterbildungsbudget für ein Executive-Programm sowie flexible Arbeitszeitgestaltung sehr entgegen.', en: 'If the fixed salary is capped by budget, a substantial education budget for an executive program as well as flexible work time arrangements would suit me very well.' },
          { de: 'Statt eines Firmenwagens würde ich ein nachhaltiges Mobilitätsbudget inklusive BahnCard 100 bevorzugen.', en: 'Instead of a company car, I would prefer a sustainable mobility budget including BahnCard 100.' },
          { de: 'Könnten wir vereinbaren, nach sechs Monaten erfolgreicher Bewährung eine Gehaltsanpassung vertraglich festzuhalten?', en: 'Could we agree to contractually stipulate a salary adjustment after six months of successful performance?' }
        ],
        culturalNote: 'In Germany, the "BahnCard 100" (unlimited 1st or 2nd class rail travel anywhere in Germany 365 days a year) is a prestigious executive perk.',
        grammarFocus: 'Idiomatic verb: "jemandem entgegenkommen" (to accommodate / suit someone).'
      },
      {
        id: 'turn-3',
        partnerPromptDe: 'Einverstanden! Die BahnCard 100 First Class und das Weiterbildungsbudget nehmen wir in den Vertrag auf, nebst einer Klausel zur Überprüfung nach sechs Monaten. Damit haben wir eine Einigung!',
        partnerPromptEn: 'Agreed! We will incorporate the BahnCard 100 First Class and the executive training budget into the contract, alongside a review clause after six months. With that, we have an agreement!',
        expectedUserConceptDe: 'Zusammenarbeit besiegeln und Vorfreude ausdrücken',
        expectedUserConceptEn: 'Seal collaboration and express anticipation',
        suggestedPhrases: [
          { de: 'Hervorragend! Mit dieser Lösung kann ich mich voll und ganz identifizieren. Ich freue mich auf die gemeinsame Zusammenarbeit!', en: 'Outstanding! I can identify fully and completely with this solution. I look forward to working together!' },
          { de: 'Vielen Dank für das konstruktive und faire Gespräch. Ich sehe den anstehenden Herausforderungen mit großer Motivation entgegen.', en: 'Thank you very much for the constructive and fair discussion. I look forward to the upcoming challenges with great motivation.' },
          { de: 'Das ist ein überzeugender Kompromiss. Lassen Sie mir den Vertragsentwurf zukommen, damit ich ihn prüfen und gegenzeichnen kann.', en: 'That is a convincing compromise. Please forward me the draft contract so that I can review and counter-sign it.' }
        ],
        culturalNote: '"Mit etwas sich identifizieren" and "einer Sache mit Freude entgegensehen" are hallmarks of articulate German business culture.',
        grammarFocus: 'Compound conjunction: "voll und ganz" (fully and completely).'
      }
    ]
  }
];
