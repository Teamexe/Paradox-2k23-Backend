const getRules = (req, res) => {
  return res.status(200).json({
    message: "rules",
    success: true,
    data: {
      header: "INSTRUCTIONS",
      body: `<h2>RULES AND INSTRUCTIONS:</h2>
      <ol>
        <li>Eligibility: The game is open to all.</li>
        <li>
          Participation: Participants can choose to play the game in solo format or
          can choose their partners by choice during or at the end of level 1.
        </li>
        <li>
          Partner Matching: If any qualified candidate for level 2 from level 1 fails
          to get into a team, they will be randomly matched with another unmatched
          partner by the organizers.
        </li>
        <li>
          Level 1 Gameplay: Participants will have 12 hours, starting from 10 a.m.
          15/04/2023 until 10 p.m. 15/04/2023 to complete level 1 and achieve the
          highest score possible. Participants will be awarded points for each
          successfully solved puzzle. The top 50 candidates with the highest scores
          will qualify for level 2.
        </li>
        <li>
          Level 2 Gameplay: Participants will be divided into teams of two, with one
          team member acting as the control officer and the other as the field
          officer. The field officer's role will be to decode the location from the
          image shown in Level 2. After decoding the image, the field officer should
          visit the place and scan the QR code located there to avail the clue for
          solving the question given to the control officer. Points will be awarded
          for each successfully solved puzzle or clue. Participants will have to
          complete all the puzzles and clues within the specified time frame. Any team
          that fails to do so will not be eligible for the leaderboard.
        </li>
        <li>
          Hints: Participants can avail hints in questions if they want. However,
          using a hint will result in a reduction of points by a given amount. The
          amount of points that will be deducted for using a hint will be specified
          for each question.
        </li>
        <li>
          Scoring: Points will be awarded for solving every puzzle and leaderboard
          will be maintained for the teams.
        </li>
        <li>
          Time limit: Level 2 will start at 10 a.m. 16/04/2023 and end at 8 p.m.
          16/04/2023.
        </li>
        <li>
          Winning Criteria: The top 3 teams in the leaderboard at the end of round two
          will be the winners.
        </li>
        <li>
          The decision of the organizers will be final and binding on all
          participants.
        </li>
      </ol>
      <h2>TERMS AND CONDITIONS:</h2>
      <ol>
        <li>
          Participants are responsible for their own safety while playing the game.
        </li>
        <li>
          Participants are not allowed to use any external aids or consult any sources
          other than those provided by the organizers.
        </li>
        <li>
          Any attempt to cheat or tamper with the game will result in immediate
          disqualification.
        </li>
        <li>
          Participants are not allowed to disclose any information related to the game
          to anyone who has not participated in the game.
        </li>
        <li>
          The organizers reserve the right to disqualify any participant who fails to
          follow the rules or behaves in an inappropriate manner.
        </li>
        <li>
          The organizers reserve the right to cancel or modify the game at any time
          without prior notice.
        </li>
        <li>
          Participants should ensure that they have a stable internet connection while
          playing the game.
        </li>
        <li>
          By participating in the game, participants agree to abide by the rules and
          regulations mentioned above.
        </li>
      </ol>
      <p>
        We hope you enjoy playing "Paradox" and wish you all the best for the game!
      </p>
      `,
    },
  });
};
module.exports = { getRules };
