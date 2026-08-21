# 4. Public attitudes toward LLM future scenarios and skills development

## 4.1 Deliberative methods for setting societal priorities around LLMs

### 4.1.1 Why a citizen deliberation phase?

Large language models (LLMs) raise policy questions that cannot be answered by technical experts alone. Their effects on education, work, and public life depend on societal priorities: Which skills should be protected? Which forms of automation should be encouraged? Where should regulation set limits? The citizen deliberation phase examines how members of the public reason about these questions after receiving shared information and hearing from one another.

The central question is simple: Can AI improve collective reasoning without replacing human judgement? In this study, AI is not used to tell participants what to think. It serves as a structured reflection tool that helps a group keep track of arguments, areas of agreement, and points of disagreement during spoken deliberation.

The design builds on deliberative democratic theory. From this perspective, legitimate collective judgement is not only a matter of counting preferences. It also depends on informed reflection, mutual justification, and the ability to connect policy preferences to underlying reasons, values, and considerations. This follows the broader literature on deliberative democracy, particularly the work of Bächtiger, Dryzek, Mansbridge, and Warren (2018), as well as the deliberative polling tradition associated with Fishkin, Luskin, and Jowell (1998).

### 4.1.2 Overview of the study design: From maxi-public to mini-public

The empirical intervention consists of two stages.

Stage 1 is the online maxi-public. The term “maxi-public” refers to a broader and more open form of public participation. It does not aim to create the same depth of discussion as a small in-person forum. Its purpose is breadth: to capture a wider range of views, concerns, arguments, and uncertainties among people living in Switzerland. Participants use the Atgora app developed by CarbonCopy to answer baseline questions, engage with learning materials, submit arguments, and respond to statements through low-friction micro-voting.

Stage 2 is the in-person mini-public. The term “mini-public” refers to a smaller deliberative setting in which participants have more time and structure to reason together. A subset of participants from Stage 1 attended workshops in Zurich and Lausanne. There, they deliberated in small groups, developed policy recommendations, and completed pre- and post-workshop questionnaires.

The relationship between the two stages is central. The maxi-public does not determine the outcome of the mini-public. It prepares it. Stage 1 helps identify the main points of contention, early areas of consensus, recurring arguments, knowledge gaps, and opinion clusters. Stage 2 uses this map of public concerns as a starting point for deeper discussion and policy formulation.

In the maxi-public, expert groups and media and news discourse provide initial information inputs. Participants then answer baseline questions, engage with learning materials, and move through repeated rounds of micro-voting and interaction. Their responses guide AI-mediated curation: the system can identify what participants find confusing, what they consider important, and where new learning materials are needed. In this sense, Stage 1 is recursive: responses do not merely generate data after the fact; they also guide what the public learns next.

The mini-public builds on this result. Key points of contention, early areas of consensus, and opinion clusters from the online deliberation enter the workshop as information inputs. In the AI-supported condition, participants speak freely in the physical room, rate AI-summarised arguments, and validate or reject proposed solutions. The AI does not decide the group recommendation; final judgement remains in human hands.

The workshop follows a 2 × 2 design that crosses the topics of education and work with human facilitation and AI support. Each room addressed both topics in sequence. In the French- and German-speaking rooms, work was human-facilitated and education was AI-supported; in the two English-speaking rooms, the assignment was reversed.

This design makes it possible to compare deliberative methods while accounting for topic-specific differences. The study does not assume that debates about education and labour markets operate in the same way. The two topics can involve different levels of personal experience, uncertainty, perceived risk, and political conflict. Across both methods, however, the same basic assumption applies: the smaller mini-public should be informed by the broader social knowledge generated through the maxi-public.

### 4.1.3 What participants produce

All groups complete the same deliberative task. Each group formulates a short policy package consisting of:

* two to three recommendations for policymakers;
* a brief justification for each recommendation;
* a short account of remaining disagreement or uncertainty within the group.

This shared output matters because the study is not only interested in what participants privately believe. It examines whether a group can translate disagreement into a more intelligible public judgement. From a deliberative-democratic perspective, the quality of a process depends not only on expressing preferences but also on articulating reasons (Bächtiger et al., 2018).

### 4.1.4 AI-supported spoken deliberation

In the AI-supported condition, participants continue to deliberate verbally with one another. The AI system does not replace the discussion, act as a participant, or produce final decisions. Its role is to add a structured layer of reflection to the conversation.

As arguments emerge, they can be captured and translated into short statements for group evaluation. Participants then respond through simple validation prompts, such as agreement/disagreement or similar micro-voting inputs. These responses create a structured record of how the group is reasoning: which arguments receive broad support, which divide the room, and which may reveal concerns specific to a subgroup.

This process is illustrated in the second diagram. The left side shows the deliberation-and-voting loop: participants first express their views in the physical room and then evaluate AI-summarised versions of the arguments raised. The right side shows the proposal loop: the system uses emerging opinion clusters to draft possible solutions, and participants accept, reject, or revise them. The loop remains deliberative because every machine-generated summary and proposal returns to participants for human validation.

The system can process these voting patterns using methods such as principal component analysis and clustering. Principal component analysis reduces the dimensionality of the opinion data, while clustering methods such as k-means can identify patterns of agreement and disagreement among participants. This approach is inspired by computational-deliberation systems such as Pol.is, which map high-dimensional opinion spaces to make consensus and division visible (Small, Bjorkegren, Erkkilä, Shaw, and Megill, 2021).

The results are then shown back to participants as provisional representations of the discussion space. They are not treated as authoritative findings. Participants review, validate, reject, or refine them before they enter the final policy package.

For this reason, the system is best understood as an “AI reflector”. It helps participants see the structure of their own discussion more clearly, but it does not replace their judgement. It does not produce autonomous decisions, personalised recommendations, behavioural predictions, or persuasive messages. It does not rank participants, secretly optimise for convergence, or suppress disagreement. Minority positions remain visible where they are relevant to the structure of the opinion landscape. This interpretation is consistent with recent work on AI-enhanced deliberative democracy that distinguishes between systems supporting collective reflection and systems attempting to simulate or replace the collective will (Revel and Pénigaud, 2025).

### 4.1.5 Human-facilitated spoken deliberation

In the human-facilitated condition, participants engage in traditional small-group spoken deliberation without the AI-supported argument-capture and micro-voting layer. Trained facilitators support the process.

These groups also benefit from the online maxi-public because the workshop topic, briefing material, and starting points can be informed by the same online opinion landscape. What differs is the method used inside the room. Instead of dynamic AI summarisation and voting, the group relies on human facilitation, written notes, and shared discussion summaries.

The facilitators follow a standardised protocol. They support equal opportunities to participate, clarify procedural steps, organise contributions, and help the group formulate its final policy package. They may not introduce substantive positions, advocate for a particular view, or steer the group toward a predetermined outcome.

This condition approximates the facilitation practices used in citizens’ assemblies and deliberative mini-publics, where facilitators maintain procedural fairness while leaving substantive judgement to participants (Bächtiger et al., 2018; Fishkin et al., 1998). Discussions are documented through written materials such as Post-it notes and shared summaries. They may also be audio-recorded for later qualitative analysis where participants have given explicit consent.

At the end of the session, participants complete the same validation step used in the AI-supported condition. They indicate whether the final policy package fairly represents the discussion and adequately reflects their own views.

### 4.1.6 Measuring deliberative quality

The original analysis plan was oriented toward the Deliberative Reason Index (DRI) developed by Niemeyer and Veri (2022), a group-level measure of the coherence between policy preferences and the reasons underpinning them. The workshop battery used in the field was shorter than the full instrument originally planned. This chapter therefore does not report a formal DRI effect.

Instead, three observable levels are analysed separately: repeated policy positions before and after the workshop, the statements and policy packages formulated or validated by the groups, and participants’ evaluations of the deliberative process. Consensus and deliberative quality remain analytically distinct: a discussion can clarify reasons and lines of conflict without moving everyone to the same position.

### 4.1.7 Analytical strategy

The questionnaire items and main analysis plan were preregistered before data collection. For the shorter instrument actually administered, repeated items are analysed as linked before-and-after comparisons. The results report changes on the original seven-point scale, bootstrap uncertainty intervals, Wilcoxon tests, and a Benjamini–Hochberg correction across twenty repeated items.

The analysis remains exploratory and estimation-focused. Room, language, topic order, and group composition are reported descriptively. Interpretation focuses on effect sizes, response distributions, and robust patterns rather than a single overall score.

### 4.1.8 Recruitment, sample, and incentives

Participants were recruited through a shared public route. Online outreach through civil-society organisations, the TA-SWISS network, and digital flyers directed interested people to a public welcome page. Recruitment source was recorded because participants arriving through different channels may differ in motivation, background, or prior interest in AI policy.

As expected, the sample shows above-average civic engagement, high educational attainment, and substantial experience with AI. Demographic information collected during onboarding, including age, gender, education, professional field, and prior AI experience, is therefore used to describe the participation process rather than to extrapolate to the Swiss population.

Online participation was not compensated. Participants attending a workshop received a flat voucher worth CHF 40. This compensation policy applied regardless of recruitment source and was disclosed in the participant information sheet.

### 4.1.9 Ethical and responsible-AI safeguards

The study involves fully informed participants and uses neither deception nor incomplete disclosure. Consent takes place in two stages: digitally before online participation and in writing before the workshop. Participants are informed about the role, capabilities, and limits of the AI-supported system, including the fact that it performs statistical aggregation and clustering rather than autonomous judgement. Where spoken contributions are audio-recorded or transcribed, participants give explicit consent before recording begins.

Data protection follows the principles of minimisation, separation, and restricted access. Identifying information used for contact, workshop administration, and voucher distribution is stored separately from survey, voting, and deliberation data. Research data are coded or pseudonymised before analysis, and access to linkage information is limited to the core research team. Free-text responses and transcripts are checked for directly identifying information, and potentially identifying details are redacted where they are not analytically necessary.

Participants can withdraw from the study at any time without disadvantage. Identifiable data are deleted where feasible, while fully anonymised aggregate data cannot be removed retrospectively.

Responsible-AI safeguards are built into the deliberative design. AI-supported outputs are always provisional and remain subject to participant review, rejection, and revision. The system does not produce binding decisions, individual predictions, behavioural profiles, personalised recommendations, or persuasive interventions. Participants are reminded that disagreement and diversity of opinion are expected and valuable.

## 4.2 Results of the deliberative survey process

The preceding sections explain how the online maxi-public, workshops, and post-workshop survey build on one another. The results follow the same movement from breadth to depth: the online survey shows which attitudes and policy preferences were widespread; the workshops reveal the reasons, conditions, and open questions behind them; and the post-workshop survey shows which repeated positions changed in average support.

### 4.2.1 Three data sources, three distinct contributions

Three data sources must be kept separate in the interpretation. They complement one another but must not be added together as if they formed a single sample.

| Data source | Analytical basis | Contribution to the argument |
| --- | --- | --- |
| Online survey | Export of 11 August 2026: 135 submitted records; 103 people included after screening; 485 usable free-text responses; plus a separate live vote on 29 May with 23 people | Breadth: initial attitudes, policy preferences, and participants’ language |
| Workshops | Four rooms; 76 workshop questionnaires; 140 Post-it rows; 136 MURMI propositions | Depth: reasons, conditions, red lines, open decisions, and room-specific votes |
| Post-workshop survey | 76 questionnaires; 49 people uniquely linked to the online baseline; 36 to 44 paired responses per item | Change: repeated policy positions and evaluations after the workshops |

A Post-it is a group artefact, not an independent individual voice. A MURMI proposition belongs to the room and statement set in which it was voted on. The live vote is likewise not added to the 103 people in the main survey. Before-and-after comparisons use only participants who could be linked unambiguously across data-collection points. Each figure therefore reports its own denominator and scale.

The 11 August export replaces the earlier interim online datasets. Compared with the 10 August export, the number of submitted records rose from 110 to 135, and the analysed sample after screening rose from 81 to 103 people. For the policy questions introduced later, the valid denominators increased from approximately 50–55 to 70–77. All online percentages and figures below were recalculated using this larger dataset.

### 4.2.2 The central finding: conditional openness

Participants were neither uniformly for nor uniformly against AI. They accepted AI where it served a recognisable human purpose: as a learning aid, support for repetitive work, or a tool for more demanding tasks. Reservations emerged when support became substitution, human skills appeared likely to erode, decisions could no longer be contested, or benefits and capabilities were concentrated in only part of society.

A simple positive-versus-negative sentiment analysis would miss this position. Many statements support an application while placing strict conditions on it. The qualitative analysis therefore classified contributions according to three functions: **opportunities**, **conditions**, and **red lines**. The following lightly edited statements illustrate this logic in the language used during the workshops.

The updated online survey already reveals this tension between use and caution. Eighty-nine of 103 participants used AI at least weekly, including 68 who used it daily or almost daily. At the same time, on the original six-point trust scale, only 15% rated their trust in AI-generated text as high; 57 of 100 said they always or often checked AI answers. On the seven-point scale reconstructed for publication, 92% agreed that AI can reproduce bias, 90% warned of a loss of critical and independent thinking, and 91% saw benefits when people learn to use AI competently. Frequent use did not imply blind trust.

The new online free-text responses also combine openness with conditions. One participant wrote: “Checking sources, questioning results, and asking what we ultimately want to produce are crucial for distinguishing the opportunities from the risks of using AI.” Another called for workplace participation: “It should not be IT departments deciding these things. Other employees should have a say too, because they are the ones who will be affected.” The first statement was editorially translated into English, and both were lightly shortened.

| Topic | Extract from the workshop | Workshop |
| --- | --- | --- |
| Education | “AI should be used in some shape or form, but schools should distinguish fundamental critical skills from tool use. AI should lead students to think; harder tasks can then use it to raise the level of the exercise.” | Zurich, English |
| Education | “Students still need to know how to research, ask the right questions, and check what is fabricated. Use AI to start, then check the information yourself; perhaps students write first and use AI to edit.” | Zurich, English |
| Education | “Freedom should increase with age: strict in primary school, fully open at doctorate level. Teach students to use AI to correct and improve, but not replace.” | Lausanne, English |
| Work | “How can we know which AI is best? Responsibility should be shared among government, employers, and education.” | Lausanne, French |
| Work | “Companies may require the use of AI, but in that case they should provide state-supported training in how to use it—as worker protection.” | Zurich, German |
| Work | “How will productivity gains be shared? One example moved customer-service employees into remote interior-design consulting: new roles can be created during workforce transition.” | Zurich, German |

The French and German statements were editorially translated into English; all extracts were lightly edited only for grammar and length. They illustrate reasoning and are not frequency counts.

Together, these statements suggest a simple **augmentation test**: AI is considered useful when it expands human capability without making the underlying skill or human responsibility disappear.

### 4.2.3 Education: AI with guardrails

In education, the strongest consensus is not about maximising tool use but about the capacity to evaluate AI critically. In the updated export, 95% supported teaching students to identify errors and bias, while only 3% opposed this (n = 77). Teacher training, clear rules, and protection of student data also received approximately 88–90% support, with 77–79 valid responses each.

<p align="center">
  <img src="figures/chapter4_01_education_combined.png" alt="Stacked bars showing attitudes toward AI in education" width="92%">
</p>

<p align="center"><em>Figure 19: Education—AI with guardrails. The upper panel shows selected items from the online export of 11 August 2026 on a seven-point scale collapsed into five categories. The lower panel shows propositions from the German-speaking Zurich workshop on their original five-point scale. The sources are not pooled; support, opposition, and the relevant denominator appear on the right.</em></p>

The picture becomes more differentiated when implementation is made concrete. Seventy per cent supported using AI across school subjects, while 62% also supported limits designed to protect traditional learning. Seventy-two per cent supported redesigning examinations and assignments; almost one quarter opposed this. The conflict is therefore less about whether learning should be protected than about when direct AI use should begin and how schools can continue to identify what a student has understood independently.

A separate online live vote on 29 May made this question concrete across stages of education. The vote had already closed before the larger 11 August export became available and therefore still comprises 23 participants. The figure is complementary evidence, not an additional component of the 103-person main analysis.

<p align="center">
  <img src="figures/chapter4_02_graded_assignments.png" alt="Stacked bars showing the allowed share of AI-supported graded assignments by education level" width="90%">
</p>

<p align="center"><em>Figure 20: Allowed share of graded assignments using AI. Colours show the proportion of AI-supported graded work the 23 voters would allow at each educational stage; numbers inside the bars are vote counts. The mean selected share appears on the right.</em></p>

This small voting group believed that permission should increase gradually. In primary school, 17 of 23 selected no more than 10%, and 21 selected no more than 25%. At secondary school or gymnasium, 19 of 23 responses were at or below 25%. In vocational education, by contrast, 8 of 23 selected at least 50%; in higher education, 11 of 23 did so. The mean permitted share rose from 13.5% in primary school to 25.9%, 34.3%, and 39.3% at higher-education level. The pattern does not support a blanket ban. It points instead toward greater freedom once foundational skills, independence, and the capacity to verify have developed further.

The workshop votes make this distinction particularly clear. In the German-speaking Zurich workshop, all 25 recorded participants supported the proposition that learners should be able to distinguish facts from opinions and check sources. Twenty-four of 26 supported understanding AI’s capabilities and limits. By contrast, introducing AI at approximately age eleven received support from only 7 of 26 participants. Source checking is the common denominator; the appropriate starting age remains open.

The Post-its translate this pattern into concrete educational practice: progressive hints instead of ready-made answers, independent writing before AI-assisted editing, disclosure of AI use, oral or supervised assessment, and protected spaces for independent work. Teacher training, assessment design, data protection, and critical information literacy therefore form a single package.

### 4.2.4 Work: adaptation and fairness

On work, participants likewise distinguished between a broadly supported principle and more contested instruments. In the updated export, 90% supported workers sharing in productivity gains. Eighty-four per cent favoured restrictions on fully automated hiring, dismissal, and performance decisions; 83% supported monitoring for possible discrimination; and 82% supported training for workers’ current jobs (n = 77 for each item).

<p align="center">
  <img src="figures/chapter4_02_work_combined.png" alt="Stacked bars showing attitudes toward AI and work" width="92%">
</p>

<p align="center"><em>Figure 21: Work—adaptation and fairness. The upper panel shows preferences from the online export of 11 August 2026; the lower panel shows selected propositions from the English-speaking Zurich workshop. The two sources remain separate.</em></p>

There was less agreement on specific forms of implementation. Worker participation before AI is introduced in the workplace received 61% support and 34% opposition. Taxing AI or automation to support affected workers received 53% support and 38% opposition. The rejection of passive adaptation was clearer: only 27% wanted to leave the labour market largely to respond on its own, while 66% opposed this approach.

The qualitative evidence explains this distribution. Participants wanted to preserve human competence, tailor training to the occupation and level of risk, make automated dismissals contestable, and return some of the value generated from public data. In the English-speaking Zurich workshop, 88% supported using AI to augment rather than replace human skills, and 90% wanted humans retained in sensitive decisions. A single AI certificate for all workers, by contrast, convinced only 33%; 40% opposed it.

The direction is therefore clearer than the instrument: institutions should actively manage the transition and retain responsibility. Whether this is achieved through taxation, participation models, sector-specific certificates, or other mechanisms must be decided in context.

### 4.2.5 Democracy and trust: concrete risks

The updated online survey distinguishes between concrete information risks and broader expectations about AI’s democratic benefits. At least some agreement was expressed by 94% for the statement that AI can manipulate opinions and behaviour, 92% for the reproduction of bias, and 91% each for increased polarisation and greater difficulty identifying what is true. The threat to digital privacy also received 87% agreement. Depending on the item, the valid denominators were 86 or 95.

<p align="center">
  <img src="figures/chapter4_03_democracy_trust.png" alt="Stacked bars showing democracy, trust, and central AI risks" width="92%">
</p>

<p align="center"><em>Figure 22: Democracy and trust. The figure uses the online export of 11 August 2026 and shows the complete distribution on the seven-point scale collapsed into five categories. Agreement, disagreement, and the relevant denominator appear on the right.</em></p>

The more abstract judgement was less clear-cut. Eighty per cent at least somewhat agreed that AI poses a risk to democracy; on whether AI could improve democratic participation, 48% agreed and 51% disagreed. Only 41% considered AI tools helpful for understanding public issues, while 58% disagreed. At the same time, 78% of 93 respondents supported public votes or citizen consultations on AI regulation. The policy implication is therefore not to transfer democratic functions to AI. Priority should instead be given to protection against manipulation, verifiable information, and participatory processes in which people retain the decision.

### 4.2.6 What changed after deliberation

Four of the twenty repeated policy positions passed all robustness checks: their bootstrap intervals excluded zero, they remained significant after correction for multiple testing, and the result held in the strictly linked sensitivity sample. The following figure presents means on the original scale from 1 to 7. The arrows measure scale points, not the proportion of people who changed their answer.

<p align="center">
  <img src="figures/chapter4_04_position_change.png" alt="Arrow chart showing four robust before-and-after changes" width="88%">
</p>

<p align="center"><em>Figure 23: Four robust before-and-after changes. Open circles show the online mean, while filled circles show the post-workshop mean. The change in points on the seven-point scale appears on the right.</em></p>

The largest change concerned support for taxing gains from AI or automation to assist affected workers: the mean rose from 4.6 to 5.6. Support for redesigning examinations and assignments rose from 5.2 to 6.0, for using AI across school subjects from 4.9 to 5.7, and for teacher training from 6.0 to 6.6.

This is not a general movement toward “more AI”. Positions shifted toward **governed integration**: greater openness to classroom use, accompanied by stronger assessment design and teacher competence, as well as greater support for distributing the gains from automation. The pattern shifts the analytical focus away from the mere existence of a tool and toward the institutional changes that must accompany its introduction.

### 4.2.7 What differed between workshops

The four workshop rooms were not interchangeable. They differed in location, language, size, topic order, composition, and the course of the AI-supported session. Two compact tables keep the room order constant so that each measure can be compared vertically.

**Table 4.1: Deliberation and process**

| Workshop | Session order | Support for MURMI propositions | Policy package accepted | AI-process rating (1–7) |
| --- | --- | ---: | ---: | ---: |
| Lausanne, French | Work → AI-supported education | 79% | 69% (9/13) | 4.3 |
| Lausanne, English | Education → AI-supported work | 68% | 83% (5/6) | 5.1 |
| Zurich, German | Work → AI-supported education | 74% | 82% (14/17) | 5.1 |
| Zurich, English | Education → AI-supported work | 68% | 91% (21/23) | 5.6 |

**Table 4.2: Linked baseline profile**

| Workshop | Linked n | Under age 35 | University degree | At least weekly AI use |
| --- | ---: | ---: | ---: | ---: |
| Lausanne, French | 9 | 22% | 56% | 67% |
| Lausanne, English | 5 | 40% | 100% | 80% |
| Zurich, German | 15 | 67% | 67% | 93% |
| Zurich, English | 18 | 89% | 89% | 89% |

The two local-language rooms followed the same order: human-facilitated work followed by AI-supported education. The linked Lausanne profile was older and less strongly academic than the Zurich profile. Support for the relevant MURMI propositions was 79% and 74%, respectively; ratings of the AI-supported process were 4.3 and 5.1.

The two English-speaking rooms also followed the same order: human-facilitated education followed by AI-supported work. Aggregate support for their respective MURMI propositions was identical at 68%, while the process rating was slightly higher in Zurich. At the same time, the linked Lausanne profile comprised only five people, all of whom held university degrees; the Zurich profile was larger and considerably younger.

These comparisons do not demonstrate language or location effects. Each room voted on a different set of propositions, and several contextual features changed simultaneously. Their value lies in showing that language, order, and group composition must be retained in the interpretation.

## 4.3 Societal priorities and trade-offs in the use of LLMs

The findings lead to six direct policy priorities:

1. **Teach verification, not only tool use.** Students and workers should be able to check sources, question outputs, and recognise when AI is unreliable.
2. **Train people before expecting them to use AI.** Teachers and workers need preparation for the decisions they actually face, and that training must keep pace with the tools.
3. **Set rules before deployment.** Schools and employers should define purpose, data use, quality control, and responsibility before introducing AI.
4. **Keep consequential decisions under human responsibility.** Hiring, dismissal, performance assessment, and educational evaluation require traceable human oversight and a clear route for appeal.
5. **Protect information integrity democratically.** Rules addressing manipulation and misleading content require independent scrutiny, traceable sources, and public participation; AI should inform democratic judgement, not replace it.
6. **Distribute access and benefits fairly.** Schools with limited resources, small companies, and workers affected by change need practical support; the benefits should not flow only to already privileged groups.

Some implementation questions are not ready for a single uniform rule. Before broad deployment, policy should test:

- the age at which direct classroom use of AI becomes appropriate;
- whether a single AI certificate can serve very different occupations;
- how workers should participate in deployment decisions; and
- which forms of benefit-sharing or taxation work in practice.

> **Core message:** AI should strengthen human capability—not replace human responsibility.

**Data and reproducibility.** The analysis package dated 21 August 2026 includes scripts, aggregate tables, source hashes, translated extracts, and figures. Restricted linkage data and individual voting data are not published.
