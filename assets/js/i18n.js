(() => {
  const signupUrl = "https://forms.gle/9kbysBanAQ4Ny3BeA";
  const taSwissLink = '<a href="https://www.ta-swiss.ch/en/ta-swiss" target="_blank" rel="noopener noreferrer">TA-SWISS</a>';
  const atgoraLink = '<a href="https://www.atgora.org/" target="_blank" rel="noopener noreferrer">Atgora</a>';
  const joshuaLink = '<a href="https://joshuacyang.com" target="_blank" rel="noopener noreferrer">Joshua C. Yang</a>';
  const emailLink = '<a href="mailto:joyang@ethz.ch">joyang@ethz.ch</a>';
  const ethicsLink = '<a href="mailto:ethics@sl.ethz.ch">ethics@sl.ethz.ch</a>';

  const copy = {
    en: {
      metaDescription: "Join the Swiss AI Futures Citizen Workshops in Zürich or Lausanne. Sign up, complete the Atgora module, attend one workshop, and receive CHF 60 after taking part.",
      title: "Swiss AI Futures Citizen Workshops",
      imageAlt: "Swiss AI Futures recruitment card about public input for AI policy",
      languageLabel: "Language",
      skip: "Skip to main content",
      homeLabel: "Swiss AI Futures home",
      headerCta: "Sign up",
      heroEyebrow: "Citizen workshops",
      heroTitle: "Swiss AI<br>Futures<br>Citizen<br>Workshops",
      datesLabel: "Workshop dates",
      dateCalloutLabel: "Workshop dates",
      zurichDate: "Tuesday, August 11",
      lausanneDate: "Wednesday, August 12",
      zurichVenueShort: "Likely venue: ETH Zurich. Exact room to be confirmed.",
      lausanneVenueShort: "Likely venue: UNIL. Exact room to be confirmed.",
      zurichTime: "5:30-7:30 pm",
      lausanneTime: "5:30-7:30 pm",
      heroText: "Share your view on how AI is affecting work and education in Switzerland. No AI expertise is needed.",
      actionsLabel: "Required actions to receive compensation",
      actionsTitle: "To receive CHF 60, complete all three steps",
      actions: [
        `<a href="${signupUrl}" target="_blank" rel="noopener noreferrer">Sign up for one workshop</a>.`,
        "Finish the Atgora app questionnaire on your phone.",
        "Attend one workshop in Zürich or Lausanne."
      ],
      heroButtons: ["1. Sign up", "2. Finish Atgora module", "3. Attend workshop"],
      panelLabel: "Compensation and key notes",
      panelEyebrow: "Compensation and key notes",
      compensationLabel: "Compensation",
      compensationAmount: "Receive<br>CHF 60",
      compensationBody: "Paid after the workshop. Payment details are collected onsite; a voucher option may be available.",
      keyNotes: [
        "Zürich workshop: German or English.",
        "Lausanne workshop: French or English.",
        "Audio recording and live transcription are required.",
        "Bring photo ID, such as an ID or student card."
      ],
      impactLabel: "Why your input matters",
      impactEyebrow: "Why it matters",
      impactTitle: "Help shape Switzerland's AI future",
      impactBody: [
        "Online contributions surface fears, hopes, and questions that might otherwise stay scattered.",
        "In-person groups then work through those themes carefully, refine them, and help turn them into something policy-makers can actually use.",
        "The final TA-SWISS report will inform the Swiss Parliament and the national conversation around AI policy, work, and education."
      ],
      signupLabel: "Sign up for the study",
      signupEyebrow: "Step 1",
      signupTitle: "Sign up for the study",
      signupBody: "Use the form to choose one session and indicate your preferred workshop language. You will receive confirmation after signing up.",
      signupButton: "Open sign-up form",
      downloadLabel: "Prepare in Atgora",
      downloadEyebrow: "Step 2",
      downloadTitle: "Download Atgora and finish the module",
      downloadBody: "Install Atgora, open Swiss AI Futures, and complete the module before your workshop. It takes about 30 minutes in the app. Please finish it no later than the day before your workshop.",
      qrLabel: "App store QR codes",
      iosLabel: "Open Atgora in the Apple App Store",
      androidLabel: "Open Atgora in Google Play",
      storeButtons: [
        '<span>iOS</span>Download on the App Store',
        '<span>Android</span>Get it on Google Play'
      ],
      instructionLabel: "Atgora app instructions",
      instructionSteps: [
        ["Download Atgora", "Install or open the app from the store."],
        ["Sign in to Atgora", "Log in or create an account if prompted."],
        ["Select Swiss AI Futures", "Open Courses and choose the Swiss AI Futures course."],
        ["Open the questionnaire", "Enter the first topic to start Stage 1."],
        ["Start the module", "Tap the first module and continue through the prompts."],
        ["Finish all prompts", "Answer the questions until the module is complete."]
      ],
      attendLabel: "Attend one workshop",
      attendEyebrow: "Step 3",
      attendTitle: "Attend one workshop",
      attendBody: "Come to the session you registered for. The workshop is also an experiment testing an AI tool that can help groups deliberate.",
      attendance: [
        ["Zürich", "Tuesday, August 11, 5:30-7:30 pm. Likely venue: ETH Zurich. Exact address sent by email."],
        ["Lausanne", "Wednesday, August 12, 5:30-7:30 pm. Likely venue: UNIL. Exact address sent by email."],
        ["Before attending", "Finish the Atgora module first."],
        ["What happens there", "You will take part in a structured discussion. Part of the workshop tests an AI-supported deliberation tool, and part uses human moderation. Audio recording and live transcription are part of the workshop format."]
      ],
      qaLabel: "Questions and answers",
      qaEyebrow: "Q&A",
      qaTitle: "Good to know",
      qa: [
        ["Who can take part?", "<p>People living in Switzerland who are 18 or older and can attend one workshop in Zürich or Lausanne.</p>"],
        ["Do I need AI expertise?", "<p>No. The workshop is designed for people with different backgrounds and everyday perspectives.</p>"],
        ["What do I need to complete?", "<p>To participate and receive CHF 60, sign up for one workshop, finish the Swiss AI Futures module in Atgora before attending, and attend the in-person workshop.</p>"],
        ["Can I attend more than one session?", "<p>No. Please register for only one Swiss AI Futures workshop.</p>"],
        ["What happens after I sign up?", "<p>You will receive confirmation after signing up. The exact workshop address will be sent by email before the event.</p>"],
        ["Can I download flyers and social images?", '<p>Yes. You can download public sharing materials for the Swiss AI Futures Citizen Workshops.</p><p class="qa-download-links"><a href="output/swiss-ai-futures-flyer-pdfs.zip" download>Flyer PDFs</a><a href="output/swiss-ai-futures-share-images.zip" download>Flyer and social images</a></p><p>The packages include English, German, and French versions in both the funky and editorial styles.</p>'],
        ["What is the study about?", "<p>The study asks people in Switzerland to share their views on how AI is affecting education, work, public services, and everyday life.</p><p>The goal is to understand where people agree, where they disagree, and what tradeoffs deserve closer public discussion.</p>"],
        ["What happens in Atgora?", "<p>In the Atgora module, you answer survey questions, vote on short statements, and may share short written arguments. The module takes about 30 minutes.</p><p>Please finish the module no later than the day before your workshop. The online module is required before the workshop, but it is not separately compensated on its own.</p>"],
        ["What happens in the workshop?", "<p>The in-person workshop lasts about two hours. Participants discuss AI in education and AI in work and labour markets.</p><p>One discussion uses AI-supported spoken deliberation, and one discussion uses human-moderated spoken deliberation.</p>"],
        ["How is AI used?", "<p>The AI system helps organise the conversation. It may capture arguments, turn them into short statements for group validation, map areas of agreement and disagreement, and return provisional summaries for participants to check.</p><p>The AI does not decide what participants should think. It does not make final recommendations, rank participants, profile individuals, track people outside the app, or generate personalised persuasive content.</p><p>All AI-supported outputs are provisional and must be reviewed, corrected, accepted, or rejected by participants.</p>"],
        ["What data is collected?", "<p>The study may collect survey responses, in-app voting choices, submitted arguments, app completion information, workshop interest or location preference, and, for workshop participants, validation responses and transcripts of spoken discussion.</p><p>Contact details such as name and email are used only for study communication, workshop invitations, and payment or voucher administration where applicable.</p><p>Identifying information is stored separately from research data. Research data is coded or pseudonymised and later anonymised where possible.</p>"],
        ["What about audio recording and transcription?", "<p>Because the workshop involves spoken discussion, participants must be comfortable with possible audio recording, automated transcription, and research processing of verbal contributions.</p><p>Audio recordings are used only for this study. Transcription may be carried out using Gladia, an AI-based speech-to-text service, under a data processing agreement.</p><p>Speaker labels in transcripts use participant codes rather than names. Raw audio is permanently deleted within 30 days after transcript verification. Pseudonymised or de-identified transcripts are kept under restricted access and are not openly published.</p><p>Participants who do not consent to possible audio recording and transcription cannot take part in the in-person workshop.</p>"],
        ["Is participation voluntary?", "<p>Yes. You may pause, skip questions, stop using the app, step out of a workshop, or withdraw from the study at any time without giving a reason and without disadvantage.</p><p>If you withdraw, identifiable data will be deleted where feasible. Fully anonymised data that has already been included in aggregate analysis may no longer be removable.</p>"],
        ["Are there risks or support options?", "<p>This study involves minimal risk. Some questions about AI, education, work, employment, or social change may feel complex or sensitive.</p><p>In the workshops, a support person and quiet space will be available. Participants may pause or step out at any time.</p><p>Please avoid sharing names, contact details, or identifying personal information about yourself or other people in written responses or workshop discussion.</p>"],
        ["Who is involved?", `<p>Swiss AI Futures is funded by ${taSwissLink} and run by a project team with researchers affiliated with several universities.</p><p>Study contact: ${joshuaLink}, ${emailLink}. Principal investigators include Prof. Maud Reveilhac and Prof. Aurelia Tamò-Larrieux.</p><p>The project team includes Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta, and Nisha Yadav.</p><p>The ${atgoraLink} app is provided by the @gora Foundation / Carbon Copy as a technology partner.</p><p>ETH Zurich controls the research data. The technology partner may process app data only for implementation, security, and technical support under a project-specific agreement and data processing agreement.</p><p>TA-SWISS does not receive individual participant data and has no editorial control over the research.</p>`],
        ["Who can I contact?", `<p>For questions about the study, contact ${joshuaLink} at ${emailLink}.</p><p>For complaints about participation in the study, contact the ETH Zurich Ethics Committee Secretariat at ${ethicsLink} or +41 44 632 85 72.</p>`]
      ],
      teamLabel: "Project team",
      teamEyebrow: "Project team",
      teamTitle: "Who is running this?",
      teamPhotoAlt: "Swiss AI Futures project team standing together outside",
      team: [
        ["TA-SWISS project", `${taSwissLink} funds Swiss AI Futures as a public discussion project on the future of AI in Switzerland.`],
        ["Study contact", `${joshuaLink}, ${emailLink}`],
        ["Principal investigators", "Maud Reveilhac and Aurelia Tamò-Larrieux."],
        ["Project team", "Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta, and Nisha Yadav."],
        ["Technology partner", `${atgoraLink} is the technology partner and app provider for the online module.`],
        ["Data and independence", "ETH Zurich controls the research data. TA-SWISS does not receive individual participant data and has no editorial control over the research."],
        ["Ethics", "Approved without reservations. Project 26 ETHICS-116."]
      ],
      footer: {
        questions: "Questions?",
        contact: `Contact ${joshuaLink} at ${emailLink}.`,
        project: `${taSwissLink} project. Ethics approved: 26 ETHICS-116.`
      }
    },
    de: {
      metaDescription: "Nehmen Sie an den Swiss AI Futures Bürgerworkshops in Zürich oder Lausanne teil. Melden Sie sich an, absolvieren Sie das Atgora-Modul, besuchen Sie einen Workshop und erhalten Sie danach CHF 60.",
      title: "Swiss AI Futures Bürgerworkshops",
      imageAlt: "Swiss AI Futures Rekrutierungsgrafik über öffentliche Beiträge zur KI-Politik",
      languageLabel: "Sprache",
      skip: "Zum Hauptinhalt springen",
      homeLabel: "Swiss AI Futures Startseite",
      headerCta: "Anmelden",
      heroEyebrow: "Bürgerworkshops",
      heroTitle: "Swiss AI<br>Futures<br>Bürgerworkshops",
      datesLabel: "Workshop-Termine",
      dateCalloutLabel: "Workshop-Termine",
      zurichDate: "Dienstag, 11. August",
      lausanneDate: "Mittwoch, 12. August",
      zurichVenueShort: "Voraussichtlicher Ort: ETH Zürich. Genauer Raum wird noch bestätigt.",
      lausanneVenueShort: "Voraussichtlicher Ort: UNIL. Genauer Raum wird noch bestätigt.",
      zurichTime: "17:30-19:30",
      lausanneTime: "17:30-19:30",
      heroText: "Teilen Sie Ihre Sicht darauf, wie KI Arbeit und Bildung in der Schweiz verändert. KI-Fachwissen ist nicht nötig.",
      actionsLabel: "Erforderliche Schritte für die Entschädigung",
      actionsTitle: "Um CHF 60 zu erhalten, absolvieren Sie alle drei Schritte",
      actions: [
        `<a href="${signupUrl}" target="_blank" rel="noopener noreferrer">Melden Sie sich für einen Workshop an</a>.`,
        "Füllen Sie den Atgora-App-Fragebogen auf Ihrem Smartphone aus.",
        "Besuchen Sie einen Workshop in Zürich oder Lausanne."
      ],
      heroButtons: ["1. Anmelden", "2. Atgora-Modul abschliessen", "3. Workshop besuchen"],
      panelLabel: "Entschädigung und Hinweise",
      panelEyebrow: "Entschädigung und Hinweise",
      compensationLabel: "Entschädigung",
      compensationAmount: "CHF 60<br>erhalten",
      compensationBody: "Auszahlung nach dem Workshop. Zahlungsdetails werden vor Ort erhoben; eine Gutscheinoption kann verfügbar sein.",
      keyNotes: [
        "Workshop in Zürich: Deutsch oder Englisch.",
        "Workshop in Lausanne: Französisch oder Englisch.",
        "Audioaufzeichnung und Live-Transkription sind erforderlich.",
        "Bitte bringen Sie einen Lichtbildausweis mit, zum Beispiel ID oder Studierendenausweis."
      ],
      impactLabel: "Warum Ihr Beitrag zählt",
      impactEyebrow: "Warum es wichtig ist",
      impactTitle: "Gestalten Sie die KI-Zukunft der Schweiz mit",
      impactBody: [
        "Online-Beiträge machen Sorgen, Hoffnungen und Fragen sichtbar, die sonst verstreut bleiben könnten.",
        "Die Gruppen vor Ort arbeiten diese Themen sorgfältig durch, verfeinern sie und helfen, daraus etwas zu machen, das politische Entscheidungsträgerinnen und Entscheidungsträger nutzen können.",
        "Der finale TA-SWISS-Bericht informiert das Schweizer Parlament und die nationale Debatte zu KI-Politik, Arbeit und Bildung."
      ],
      signupLabel: "Für die Studie anmelden",
      signupEyebrow: "Schritt 1",
      signupTitle: "Für die Studie anmelden",
      signupBody: "Nutzen Sie das Formular, um eine Sitzung auszuwählen und Ihre bevorzugte Workshop-Sprache anzugeben. Nach der Anmeldung erhalten Sie eine Bestätigung.",
      signupButton: "Anmeldeformular öffnen",
      downloadLabel: "Vorbereitung in Atgora",
      downloadEyebrow: "Schritt 2",
      downloadTitle: "Atgora herunterladen und das Modul abschliessen",
      downloadBody: "Installieren Sie Atgora, öffnen Sie Swiss AI Futures und schliessen Sie das Modul vor Ihrem Workshop ab. Es dauert etwa 30 Minuten in der App. Bitte erledigen Sie dies spätestens am Tag vor Ihrem Workshop.",
      qrLabel: "QR-Codes für App Stores",
      iosLabel: "Atgora im Apple App Store öffnen",
      androidLabel: "Atgora in Google Play öffnen",
      storeButtons: [
        "<span>iOS</span>Im App Store laden",
        "<span>Android</span>Bei Google Play herunterladen"
      ],
      instructionLabel: "Atgora-App-Anleitung",
      instructionSteps: [
        ["Atgora herunterladen", "Installieren oder öffnen Sie die App im Store."],
        ["Bei Atgora anmelden", "Melden Sie sich an oder erstellen Sie ein Konto, falls Sie dazu aufgefordert werden."],
        ["Swiss AI Futures auswählen", "Öffnen Sie Kurse und wählen Sie den Kurs Swiss AI Futures aus."],
        ["Fragebogen öffnen", "Öffnen Sie das erste Thema, um Stage 1 zu starten."],
        ["Modul starten", "Tippen Sie auf das erste Modul und folgen Sie den Aufforderungen."],
        ["Alle Fragen abschliessen", "Beantworten Sie die Fragen, bis das Modul abgeschlossen ist."]
      ],
      attendLabel: "Einen Workshop besuchen",
      attendEyebrow: "Schritt 3",
      attendTitle: "Einen Workshop besuchen",
      attendBody: "Kommen Sie zu der Sitzung, für die Sie sich angemeldet haben. Der Workshop ist auch ein Experiment, in dem ein KI-Tool getestet wird, das Gruppen bei der Deliberation unterstützen kann.",
      attendance: [
        ["Zürich", "Dienstag, 11. August, 17:30-19:30. Voraussichtlicher Ort: ETH Zürich. Die genaue Adresse wird per E-Mail verschickt."],
        ["Lausanne", "Mittwoch, 12. August, 17:30-19:30. Voraussichtlicher Ort: UNIL. Die genaue Adresse wird per E-Mail verschickt."],
        ["Vor der Teilnahme", "Schliessen Sie zuerst das Atgora-Modul ab."],
        ["Was dort passiert", "Sie nehmen an einer strukturierten Diskussion teil. Ein Teil des Workshops testet ein KI-gestütztes Deliberationstool, ein anderer Teil wird menschlich moderiert. Audioaufzeichnung und Live-Transkription sind Teil des Workshop-Formats."]
      ],
      qaLabel: "Fragen und Antworten",
      qaEyebrow: "Q&A",
      qaTitle: "Gut zu wissen",
      qa: [
        ["Wer kann teilnehmen?", "<p>Personen, die in der Schweiz leben, mindestens 18 Jahre alt sind und an einem Workshop in Zürich oder Lausanne teilnehmen können.</p>"],
        ["Brauche ich KI-Fachwissen?", "<p>Nein. Der Workshop ist für Menschen mit unterschiedlichen Hintergründen und Alltagsperspektiven konzipiert.</p>"],
        ["Was muss ich abschliessen?", "<p>Um teilzunehmen und CHF 60 zu erhalten, melden Sie sich für einen Workshop an, schliessen das Swiss AI Futures Modul in Atgora vor der Teilnahme ab und besuchen den Workshop vor Ort.</p>"],
        ["Kann ich an mehr als einer Sitzung teilnehmen?", "<p>Nein. Bitte melden Sie sich nur für einen Swiss AI Futures Workshop an.</p>"],
        ["Was passiert nach meiner Anmeldung?", "<p>Nach der Anmeldung erhalten Sie eine Bestätigung. Die genaue Workshop-Adresse wird vor der Veranstaltung per E-Mail verschickt.</p>"],
        ["Kann ich Flyer und Social-Media-Bilder herunterladen?", '<p>Ja. Sie können öffentliches Material zum Teilen für die Swiss AI Futures Bürgerworkshops herunterladen.</p><p class="qa-download-links"><a href="output/swiss-ai-futures-flyer-pdfs.zip" download>Flyer-PDFs</a><a href="output/swiss-ai-futures-share-images.zip" download>Flyer und Social-Media-Bilder</a></p><p>Die Pakete enthalten englische, deutsche und französische Versionen im funky und im editorial Stil.</p>'],
        ["Worum geht es in der Studie?", "<p>Die Studie fragt Menschen in der Schweiz nach ihren Sichtweisen darauf, wie KI Bildung, Arbeit, öffentliche Dienstleistungen und den Alltag beeinflusst.</p><p>Ziel ist es zu verstehen, wo Menschen übereinstimmen, wo sie unterschiedlicher Meinung sind und welche Abwägungen eine breitere öffentliche Diskussion verdienen.</p>"],
        ["Was passiert in Atgora?", "<p>Im Atgora-Modul beantworten Sie Umfragefragen, stimmen über kurze Aussagen ab und können kurze schriftliche Argumente teilen. Das Modul dauert etwa 30 Minuten.</p><p>Bitte schliessen Sie das Modul spätestens am Tag vor Ihrem Workshop ab. Das Online-Modul ist vor dem Workshop erforderlich, wird aber nicht separat entschädigt.</p>"],
        ["Was passiert im Workshop?", "<p>Der Workshop vor Ort dauert etwa zwei Stunden. Die Teilnehmenden diskutieren KI in der Bildung sowie KI in Arbeit und Arbeitsmärkten.</p><p>Eine Diskussion nutzt KI-gestützte gesprochene Deliberation, eine andere Diskussion wird menschlich moderiert.</p>"],
        ["Wie wird KI eingesetzt?", "<p>Das KI-System hilft, das Gespräch zu strukturieren. Es kann Argumente erfassen, sie in kurze Aussagen zur Validierung durch die Gruppe umwandeln, Bereiche von Zustimmung und Uneinigkeit abbilden und vorläufige Zusammenfassungen zur Überprüfung zurückgeben.</p><p>Die KI entscheidet nicht, was Teilnehmende denken sollen. Sie gibt keine endgültigen Empfehlungen ab, bewertet keine Teilnehmenden, erstellt keine Profile, verfolgt Menschen nicht ausserhalb der App und erzeugt keine personalisierte persuasive Inhalte.</p><p>Alle KI-gestützten Ergebnisse sind vorläufig und müssen von den Teilnehmenden überprüft, korrigiert, akzeptiert oder abgelehnt werden.</p>"],
        ["Welche Daten werden erhoben?", "<p>Die Studie kann Umfrageantworten, Abstimmungen in der App, eingereichte Argumente, Informationen zum Abschluss der App, Workshop-Interesse oder Ortspräferenz sowie bei Workshop-Teilnehmenden Validierungsantworten und Transkripte gesprochener Diskussionen erheben.</p><p>Kontaktdaten wie Name und E-Mail werden nur für Studienkommunikation, Workshop-Einladungen und gegebenenfalls Zahlungs- oder Gutscheinadministration verwendet.</p><p>Identifizierende Informationen werden getrennt von Forschungsdaten gespeichert. Forschungsdaten werden codiert oder pseudonymisiert und später soweit möglich anonymisiert.</p>"],
        ["Was gilt für Audioaufzeichnung und Transkription?", "<p>Da der Workshop eine gesprochene Diskussion umfasst, müssen Teilnehmende mit möglicher Audioaufzeichnung, automatisierter Transkription und der wissenschaftlichen Verarbeitung verbaler Beiträge einverstanden sein.</p><p>Audioaufnahmen werden nur für diese Studie verwendet. Die Transkription kann durch Gladia, einen KI-basierten Speech-to-Text-Dienst, im Rahmen einer Datenverarbeitungsvereinbarung erfolgen.</p><p>Sprecherlabels in Transkripten verwenden Teilnehmendencodes statt Namen. Roh-Audio wird innerhalb von 30 Tagen nach Überprüfung des Transkripts dauerhaft gelöscht. Pseudonymisierte oder de-identifizierte Transkripte werden unter eingeschränktem Zugang aufbewahrt und nicht offen veröffentlicht.</p><p>Personen, die einer möglichen Audioaufzeichnung und Transkription nicht zustimmen, können nicht am Workshop vor Ort teilnehmen.</p>"],
        ["Ist die Teilnahme freiwillig?", "<p>Ja. Sie können jederzeit pausieren, Fragen überspringen, die App nicht weiter nutzen, aus einem Workshop heraustreten oder die Teilnahme ohne Angabe von Gründen und ohne Nachteile beenden.</p><p>Wenn Sie zurücktreten, werden identifizierbare Daten gelöscht, soweit dies möglich ist. Vollständig anonymisierte Daten, die bereits in aggregierte Analysen eingeflossen sind, können möglicherweise nicht mehr entfernt werden.</p>"],
        ["Gibt es Risiken oder Unterstützung?", "<p>Diese Studie ist mit minimalen Risiken verbunden. Manche Fragen zu KI, Bildung, Arbeit, Beschäftigung oder gesellschaftlichem Wandel können komplex oder sensibel wirken.</p><p>In den Workshops stehen eine Unterstützungsperson und ein ruhiger Raum zur Verfügung. Teilnehmende können jederzeit pausieren oder den Raum verlassen.</p><p>Bitte vermeiden Sie es, Namen, Kontaktdaten oder identifizierende persönliche Informationen über sich selbst oder andere Personen in schriftlichen Antworten oder Workshop-Diskussionen zu teilen.</p>"],
        ["Wer ist beteiligt?", `<p>Swiss AI Futures wird von ${taSwissLink} finanziert und von einem Projektteam mit Forschenden verschiedener Universitäten durchgeführt.</p><p>Studienkontakt: ${joshuaLink}, ${emailLink}. Zu den Principal Investigators gehören Prof. Maud Reveilhac und Prof. Aurelia Tamò-Larrieux.</p><p>Zum Projektteam gehören Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta und Nisha Yadav.</p><p>Die ${atgoraLink}-App wird von der @gora Foundation / Carbon Copy als Technologiepartner bereitgestellt.</p><p>ETH Zürich kontrolliert die Forschungsdaten. Der Technologiepartner darf App-Daten nur für Umsetzung, Sicherheit und technischen Support im Rahmen einer projektspezifischen Vereinbarung und Datenverarbeitungsvereinbarung verarbeiten.</p><p>TA-SWISS erhält keine individuellen Teilnehmendendaten und hat keine redaktionelle Kontrolle über die Forschung.</p>`],
        ["Wen kann ich kontaktieren?", `<p>Bei Fragen zur Studie kontaktieren Sie ${joshuaLink} unter ${emailLink}.</p><p>Bei Beschwerden zur Teilnahme an der Studie kontaktieren Sie das Sekretariat der ETH Zürich Ethikkommission unter ${ethicsLink} oder +41 44 632 85 72.</p>`]
      ],
      teamLabel: "Projektteam",
      teamEyebrow: "Projektteam",
      teamTitle: "Wer führt das Projekt durch?",
      teamPhotoAlt: "Das Swiss AI Futures Projektteam steht gemeinsam draussen",
      team: [
        ["TA-SWISS Projekt", `${taSwissLink} finanziert Swiss AI Futures als öffentliches Diskussionsprojekt zur Zukunft von KI in der Schweiz.`],
        ["Studienkontakt", `${joshuaLink}, ${emailLink}`],
        ["Principal Investigators", "Maud Reveilhac und Aurelia Tamò-Larrieux."],
        ["Projektteam", "Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta und Nisha Yadav."],
        ["Technologiepartner", `${atgoraLink} ist der Technologiepartner und App-Anbieter für das Online-Modul.`],
        ["Daten und Unabhängigkeit", "ETH Zürich kontrolliert die Forschungsdaten. TA-SWISS erhält keine individuellen Teilnehmendendaten und hat keine redaktionelle Kontrolle über die Forschung."],
        ["Ethik", "Ohne Vorbehalte genehmigt. Projekt 26 ETHICS-116."]
      ],
      footer: {
        questions: "Fragen?",
        contact: `Kontaktieren Sie ${joshuaLink} unter ${emailLink}.`,
        project: `${taSwissLink} Projekt. Ethik genehmigt: 26 ETHICS-116.`
      }
    },
    fr: {
      metaDescription: "Participez aux ateliers citoyens Swiss AI Futures à Zurich ou Lausanne. Inscrivez-vous, terminez le module Atgora, participez à un atelier et recevez CHF 60 après votre participation.",
      title: "Ateliers citoyens Swiss AI Futures",
      imageAlt: "Visuel de recrutement Swiss AI Futures sur la contribution publique à la politique de l'IA",
      languageLabel: "Langue",
      skip: "Aller au contenu principal",
      homeLabel: "Accueil Swiss AI Futures",
      headerCta: "S'inscrire",
      heroEyebrow: "Ateliers citoyens",
      heroTitle: "Ateliers<br>citoyens<br>Swiss AI<br>Futures",
      datesLabel: "Dates des ateliers",
      dateCalloutLabel: "Dates des ateliers",
      zurichDate: "Mardi 11 août",
      lausanneDate: "Mercredi 12 août",
      zurichVenueShort: "Lieu probable: ETH Zurich. La salle exacte sera confirmée.",
      lausanneVenueShort: "Lieu probable: UNIL. La salle exacte sera confirmée.",
      zurichTime: "17:30-19:30",
      lausanneTime: "17:30-19:30",
      heroText: "Donnez votre avis sur l'impact de l'IA sur le travail et l'éducation en Suisse. Aucune expertise en IA n'est nécessaire.",
      actionsLabel: "Étapes requises pour recevoir la compensation",
      actionsTitle: "Pour recevoir CHF 60, effectuez les trois étapes",
      actions: [
        `<a href="${signupUrl}" target="_blank" rel="noopener noreferrer">Inscrivez-vous à un atelier</a>.`,
        "Remplissez le questionnaire Atgora sur votre téléphone.",
        "Participez à un atelier à Zurich ou Lausanne."
      ],
      heroButtons: ["1. S'inscrire", "2. Terminer le module Atgora", "3. Participer à l'atelier"],
      panelLabel: "Compensation et informations clés",
      panelEyebrow: "Compensation et informations clés",
      compensationLabel: "Compensation",
      compensationAmount: "Recevoir<br>CHF 60",
      compensationBody: "Versée après l'atelier. Les informations de paiement sont collectées sur place; une option de bon peut être disponible.",
      keyNotes: [
        "Atelier à Zurich: allemand ou anglais.",
        "Atelier à Lausanne: français ou anglais.",
        "L'enregistrement audio et la transcription en direct sont requis.",
        "Veuillez apporter une pièce d'identité avec photo, par exemple une carte d'identité ou une carte d'étudiant."
      ],
      impactLabel: "Pourquoi votre contribution compte",
      impactEyebrow: "Pourquoi c'est important",
      impactTitle: "Contribuez à façonner l'avenir de l'IA en Suisse",
      impactBody: [
        "Les contributions en ligne font émerger des craintes, des espoirs et des questions qui pourraient autrement rester dispersés.",
        "Les groupes en présence travaillent ensuite ces thèmes avec soin, les affinent et aident à les transformer en éléments utiles pour les responsables politiques.",
        "Le rapport final de TA-SWISS informera le Parlement suisse et le débat national sur la politique de l'IA, le travail et l'éducation."
      ],
      signupLabel: "S'inscrire à l'étude",
      signupEyebrow: "Étape 1",
      signupTitle: "S'inscrire à l'étude",
      signupBody: "Utilisez le formulaire pour choisir une session et indiquer la langue dans laquelle vous préférez participer. Vous recevrez une confirmation après votre inscription.",
      signupButton: "Ouvrir le formulaire d'inscription",
      downloadLabel: "Préparation dans Atgora",
      downloadEyebrow: "Étape 2",
      downloadTitle: "Télécharger Atgora et terminer le module",
      downloadBody: "Installez Atgora, ouvrez Swiss AI Futures et terminez le module avant votre atelier. Cela prend environ 30 minutes dans l'app. Veuillez le terminer au plus tard la veille de votre atelier.",
      qrLabel: "Codes QR pour les stores",
      iosLabel: "Ouvrir Atgora dans l'Apple App Store",
      androidLabel: "Ouvrir Atgora dans Google Play",
      storeButtons: [
        "<span>iOS</span>Télécharger dans l'App Store",
        "<span>Android</span>Disponible sur Google Play"
      ],
      instructionLabel: "Instructions pour l'app Atgora",
      instructionSteps: [
        ["Télécharger Atgora", "Installez ou ouvrez l'app depuis le store."],
        ["Se connecter à Atgora", "Connectez-vous ou créez un compte si demandé."],
        ["Sélectionner Swiss AI Futures", "Ouvrez Courses et choisissez le cours Swiss AI Futures."],
        ["Ouvrir le questionnaire", "Entrez dans le premier thème pour commencer Stage 1."],
        ["Commencer le module", "Touchez le premier module et suivez les questions."],
        ["Terminer toutes les questions", "Répondez aux questions jusqu'à ce que le module soit terminé."]
      ],
      attendLabel: "Participer à un atelier",
      attendEyebrow: "Étape 3",
      attendTitle: "Participer à un atelier",
      attendBody: "Venez à la session pour laquelle vous êtes inscrit. L'atelier est aussi une expérimentation d'un outil d'IA pouvant aider les groupes à délibérer.",
      attendance: [
        ["Zurich", "Mardi 11 août, 17:30-19:30. Lieu probable: ETH Zurich. L'adresse exacte sera envoyée par e-mail."],
        ["Lausanne", "Mercredi 12 août, 17:30-19:30. Lieu probable: UNIL. L'adresse exacte sera envoyée par e-mail."],
        ["Avant de participer", "Terminez d'abord le module Atgora."],
        ["Ce qui se passe sur place", "Vous participerez à une discussion structurée. Une partie de l'atelier teste un outil de délibération assistée par IA, et une autre partie utilise une modération humaine. L'enregistrement audio et la transcription en direct font partie du format de l'atelier."]
      ],
      qaLabel: "Questions et réponses",
      qaEyebrow: "Q&R",
      qaTitle: "Bon à savoir",
      qa: [
        ["Qui peut participer?", "<p>Les personnes vivant en Suisse, âgées de 18 ans ou plus, et pouvant participer à un atelier à Zurich ou Lausanne.</p>"],
        ["Dois-je avoir une expertise en IA?", "<p>Non. L'atelier est conçu pour des personnes ayant des parcours et des perspectives quotidiennes différents.</p>"],
        ["Que dois-je terminer?", "<p>Pour participer et recevoir CHF 60, inscrivez-vous à un atelier, terminez le module Swiss AI Futures dans Atgora avant de participer, puis participez à l'atelier en présence.</p>"],
        ["Puis-je participer à plus d'une session?", "<p>Non. Veuillez vous inscrire à un seul atelier Swiss AI Futures.</p>"],
        ["Que se passe-t-il après mon inscription?", "<p>Vous recevrez une confirmation après votre inscription. L'adresse exacte de l'atelier sera envoyée par e-mail avant l'événement.</p>"],
        ["Puis-je télécharger les flyers et les images pour les réseaux sociaux?", '<p>Oui. Vous pouvez télécharger du matériel public à partager pour les ateliers citoyens Swiss AI Futures.</p><p class="qa-download-links"><a href="output/swiss-ai-futures-flyer-pdfs.zip" download>Flyers PDF</a><a href="output/swiss-ai-futures-share-images.zip" download>Flyers et images réseaux sociaux</a></p><p>Les paquets incluent les versions anglaise, allemande et française, dans les styles funky et editorial.</p>'],
        ["Quel est le sujet de l'étude?", "<p>L'étude demande aux personnes en Suisse de partager leur point de vue sur la manière dont l'IA affecte l'éducation, le travail, les services publics et la vie quotidienne.</p><p>L'objectif est de comprendre où les personnes sont d'accord, où elles ne le sont pas, et quels arbitrages méritent une discussion publique plus approfondie.</p>"],
        ["Que se passe-t-il dans Atgora?", "<p>Dans le module Atgora, vous répondez à des questions de sondage, votez sur de courtes affirmations et pouvez partager de courts arguments écrits. Le module prend environ 30 minutes.</p><p>Veuillez terminer le module au plus tard la veille de votre atelier. Le module en ligne est requis avant l'atelier, mais il n'est pas compensé séparément.</p>"],
        ["Que se passe-t-il pendant l'atelier?", "<p>L'atelier en présence dure environ deux heures. Les participantes et participants discutent de l'IA dans l'éducation et de l'IA dans le travail et les marchés du travail.</p><p>Une discussion utilise une délibération orale assistée par IA, et une discussion utilise une modération humaine.</p>"],
        ["Comment l'IA est-elle utilisée?", "<p>Le système d'IA aide à organiser la conversation. Il peut saisir des arguments, les transformer en courtes affirmations à valider par le groupe, cartographier les zones d'accord et de désaccord, et renvoyer des résumés provisoires que les participantes et participants peuvent vérifier.</p><p>L'IA ne décide pas ce que les personnes doivent penser. Elle ne formule pas de recommandations finales, ne classe pas les participantes et participants, ne crée pas de profils individuels, ne suit pas les personnes en dehors de l'app et ne génère pas de contenu persuasif personnalisé.</p><p>Tous les résultats assistés par IA sont provisoires et doivent être examinés, corrigés, acceptés ou rejetés par les participantes et participants.</p>"],
        ["Quelles données sont collectées?", "<p>L'étude peut collecter des réponses à des sondages, des choix de vote dans l'app, des arguments soumis, des informations d'achèvement dans l'app, l'intérêt pour un atelier ou la préférence de lieu, et, pour les personnes participant à un atelier, des réponses de validation et des transcriptions de discussions orales.</p><p>Les coordonnées comme le nom et l'e-mail sont utilisées uniquement pour la communication liée à l'étude, les invitations aux ateliers et, le cas échéant, l'administration du paiement ou du bon.</p><p>Les informations identifiantes sont stockées séparément des données de recherche. Les données de recherche sont codées ou pseudonymisées, puis anonymisées lorsque cela est possible.</p>"],
        ["Qu'en est-il de l'enregistrement audio et de la transcription?", "<p>Comme l'atelier comprend une discussion orale, les participantes et participants doivent être à l'aise avec un possible enregistrement audio, une transcription automatisée et le traitement scientifique de leurs contributions verbales.</p><p>Les enregistrements audio sont utilisés uniquement pour cette étude. La transcription peut être effectuée avec Gladia, un service de speech-to-text basé sur l'IA, dans le cadre d'un accord de traitement des données.</p><p>Les étiquettes de locuteurs dans les transcriptions utilisent des codes de participation plutôt que des noms. L'audio brut est supprimé définitivement dans les 30 jours suivant la vérification de la transcription. Les transcriptions pseudonymisées ou dé-identifiées sont conservées avec un accès restreint et ne sont pas publiées ouvertement.</p><p>Les personnes qui ne consentent pas à une possible audio-enregistrement et transcription ne peuvent pas participer à l'atelier en présence.</p>"],
        ["La participation est-elle volontaire?", "<p>Oui. Vous pouvez faire une pause, passer des questions, arrêter d'utiliser l'app, sortir d'un atelier ou vous retirer de l'étude à tout moment, sans donner de raison et sans désavantage.</p><p>Si vous vous retirez, les données identifiables seront supprimées lorsque cela est possible. Les données entièrement anonymisées déjà incluses dans une analyse agrégée peuvent ne plus pouvoir être retirées.</p>"],
        ["Y a-t-il des risques ou du soutien?", "<p>Cette étude comporte un risque minimal. Certaines questions sur l'IA, l'éducation, le travail, l'emploi ou le changement social peuvent sembler complexes ou sensibles.</p><p>Dans les ateliers, une personne de soutien et un espace calme seront disponibles. Les participantes et participants peuvent faire une pause ou sortir à tout moment.</p><p>Veuillez éviter de partager des noms, coordonnées ou informations personnelles identifiantes vous concernant ou concernant d'autres personnes dans les réponses écrites ou la discussion de l'atelier.</p>"],
        ["Qui est impliqué?", `<p>Swiss AI Futures est financé par ${taSwissLink} et mené par une équipe de projet avec des chercheuses et chercheurs affiliés à plusieurs universités.</p><p>Contact pour l'étude: ${joshuaLink}, ${emailLink}. Les principales investigatrices incluent Prof. Maud Reveilhac et Prof. Aurelia Tamò-Larrieux.</p><p>L'équipe de projet comprend Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta et Nisha Yadav.</p><p>L'app ${atgoraLink} est fournie par la @gora Foundation / Carbon Copy en tant que partenaire technologique.</p><p>L'ETH Zurich contrôle les données de recherche. Le partenaire technologique peut traiter les données de l'app uniquement pour la mise en oeuvre, la sécurité et le support technique, dans le cadre d'un accord spécifique au projet et d'un accord de traitement des données.</p><p>TA-SWISS ne reçoit pas de données individuelles de participation et n'a aucun contrôle éditorial sur la recherche.</p>`],
        ["Qui puis-je contacter?", `<p>Pour toute question sur l'étude, contactez ${joshuaLink} à ${emailLink}.</p><p>Pour toute plainte concernant la participation à l'étude, contactez le secrétariat de la Commission d'éthique de l'ETH Zurich à ${ethicsLink} ou au +41 44 632 85 72.</p>`]
      ],
      teamLabel: "Équipe de projet",
      teamEyebrow: "Équipe de projet",
      teamTitle: "Qui mène ce projet?",
      teamPhotoAlt: "L'équipe de projet Swiss AI Futures debout ensemble à l'extérieur",
      team: [
        ["Projet TA-SWISS", `${taSwissLink} finance Swiss AI Futures comme projet de discussion publique sur l'avenir de l'IA en Suisse.`],
        ["Contact pour l'étude", `${joshuaLink}, ${emailLink}`],
        ["Principales investigatrices", "Maud Reveilhac et Aurelia Tamò-Larrieux."],
        ["Équipe de projet", "Gerold Schneider, Simon Mayer, Martial Pasquier, Bohdan Trembovelskyi, Vlada Druta et Nisha Yadav."],
        ["Partenaire technologique", `${atgoraLink} est le partenaire technologique et le fournisseur de l'app pour le module en ligne.`],
        ["Données et indépendance", "L'ETH Zurich contrôle les données de recherche. TA-SWISS ne reçoit pas de données individuelles de participation et n'a aucun contrôle éditorial sur la recherche."],
        ["Éthique", "Approuvé sans réserve. Projet 26 ETHICS-116."]
      ],
      footer: {
        questions: "Questions?",
        contact: `Contactez ${joshuaLink} à ${emailLink}.`,
        project: `Projet ${taSwissLink}. Éthique approuvée: 26 ETHICS-116.`
      }
    }
  };

  const languageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("lang");
    if (requested in copy) return requested;
    const firstPathPart = window.location.pathname.split("/").filter(Boolean)[0];
    if (firstPathPart in copy) return firstPathPart;
    return "en";
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && value != null) node.textContent = value;
  };

  const setHtml = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && value != null) node.innerHTML = value;
  };

  const setAttr = (selector, attr, value) => {
    const node = document.querySelector(selector);
    if (node && value != null) node.setAttribute(attr, value);
  };

  const setTexts = (selector, values) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (values[index] != null) node.textContent = values[index];
    });
  };

  const setList = (selector, values) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (values[index] != null) node.innerHTML = values[index];
    });
  };

  const applyTranslations = () => {
    const lang = languageFromUrl();
    const t = copy[lang] || copy.en;
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    document.title = t.title;

    try {
      window.localStorage.setItem("swissAiFuturesLanguage", lang);
    } catch (_) {
      // Language preference is helpful, but the page should work without storage.
    }

    setAttr('meta[name="description"]', "content", t.metaDescription);
    setAttr('meta[property="og:title"]', "content", t.title);
    setAttr('meta[property="og:description"]', "content", t.metaDescription);
    setAttr('meta[property="og:image:alt"]', "content", t.imageAlt);
    setAttr('meta[name="twitter:title"]', "content", t.title);
    setAttr('meta[name="twitter:description"]', "content", t.metaDescription);
    setAttr('meta[name="twitter:image:alt"]', "content", t.imageAlt);

    setText(".skip-link", t.skip);
    setAttr(".brand", "aria-label", t.homeLabel);
    setAttr(".language-switcher", "aria-label", t.languageLabel);
    setText(".header-cta", t.headerCta);

    document.querySelectorAll("[data-lang-switch]").forEach((link) => {
      const active = link.dataset.langSwitch === lang;
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    setText(".hero-copy > .eyebrow", t.heroEyebrow);
    setHtml(".hero-copy h1", t.heroTitle);
    setAttr(".date-callout", "aria-label", t.datesLabel);
    setText(".date-callout-label", t.dateCalloutLabel);
    setText(".date-callout-list article:nth-child(1) span", t.zurichDate);
    setText(".date-callout-list article:nth-child(1) time", t.zurichTime);
    setText(".date-callout-list article:nth-child(1) p", t.zurichVenueShort);
    setText(".date-callout-list article:nth-child(2) span", t.lausanneDate);
    setText(".date-callout-list article:nth-child(2) time", t.lausanneTime);
    setText(".date-callout-list article:nth-child(2) p", t.lausanneVenueShort);
    setText(".hero-text", t.heroText);
    setAttr(".required-actions", "aria-label", t.actionsLabel);
    setText(".required-actions strong", t.actionsTitle);
    setList(".required-actions li", t.actions);
    setTexts(".hero-actions a", t.heroButtons);

    setAttr(".workshop-hero-panel", "aria-label", t.panelLabel);
    setText(".workshop-hero-panel > .eyebrow", t.panelEyebrow);
    setText(".voucher-callout span", t.compensationLabel);
    setHtml(".voucher-callout strong", t.compensationAmount);
    setText(".voucher-callout p", t.compensationBody);
    setTexts(".key-notes li", t.keyNotes);

    setAttr("#impact", "aria-label", t.impactLabel);
    setText("#impact .eyebrow", t.impactEyebrow);
    setText("#impact h2", t.impactTitle);
    setTexts("#impact .section-copy p:not(.eyebrow)", t.impactBody);

    setAttr("#signup", "aria-label", t.signupLabel);
    setText("#signup .eyebrow", t.signupEyebrow);
    setText("#signup h2", t.signupTitle);
    setText("#signup .section-copy p:not(.eyebrow)", t.signupBody);
    setText("#signup .primary-link-button", t.signupButton);

    setAttr("#download", "aria-label", t.downloadLabel);
    setText("#download .eyebrow", t.downloadEyebrow);
    setText("#download h2", t.downloadTitle);
    setText("#download .download-copy p:not(.eyebrow)", t.downloadBody);
    setAttr(".download-qrs", "aria-label", t.qrLabel);
    setAttr(".download-qrs a:nth-child(1)", "aria-label", t.iosLabel);
    setAttr(".download-qrs a:nth-child(2)", "aria-label", t.androidLabel);
    setHtml(".store-actions a:nth-child(1)", t.storeButtons[0]);
    setHtml(".store-actions a:nth-child(2)", t.storeButtons[1]);
    setAttr(".instruction-steps", "aria-label", t.instructionLabel);
    document.querySelectorAll(".instruction-step-button").forEach((button, index) => {
      if (!t.instructionSteps[index]) return;
      const [strong, em] = t.instructionSteps[index];
      button.querySelector("strong").textContent = strong;
      button.querySelector("em").textContent = em;
    });

    setAttr("#attend", "aria-label", t.attendLabel);
    setText("#attend .eyebrow", t.attendEyebrow);
    setText("#attend h2", t.attendTitle);
    setText("#attend .section-copy p:not(.eyebrow)", t.attendBody);
    document.querySelectorAll(".attendance-list article").forEach((article, index) => {
      if (!t.attendance[index]) return;
      article.querySelector("h3").textContent = t.attendance[index][0];
      article.querySelector("p").textContent = t.attendance[index][1];
    });

    setAttr("#qa", "aria-label", t.qaLabel);
    setText("#qa .eyebrow", t.qaEyebrow);
    setText("#qa h2", t.qaTitle);
    document.querySelectorAll("#qa .qa-item").forEach((item, index) => {
      if (!t.qa[index]) return;
      item.querySelector("summary").textContent = t.qa[index][0];
      item.querySelector("div").innerHTML = t.qa[index][1];
    });

    setAttr("#team", "aria-label", t.teamLabel);
    setText("#team .eyebrow", t.teamEyebrow);
    setText("#team h2", t.teamTitle);
    setAttr(".team-photo img", "alt", t.teamPhotoAlt);
    document.querySelectorAll("#team .plain-list article").forEach((article, index) => {
      if (!t.team[index]) return;
      article.querySelector("h3").textContent = t.team[index][0];
      article.querySelector("p").innerHTML = t.team[index][1];
    });

    setText(".site-footer strong", t.footer.questions);
    setHtml(".site-footer span:nth-of-type(1)", t.footer.contact);
    setHtml(".site-footer span:nth-of-type(2)", t.footer.project);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations, { once: true });
  } else {
    applyTranslations();
  }
})();
