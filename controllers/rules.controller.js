const getRules = (req, res) => {
  return res.status(200).json({
    message: "rules",
    success: true,
    data: {
      header: "INSTRUCTIONS",
      body: `<h2>Treasure hunt: why it’s good for children<a id="treasure-hunt-why-its-good-for-children-nav-title" class="inpage-link-target"></a></h2>
      <p>A treasure hunt is all about looking for something and then finding it. An outdoor treasure hunt game encourages children to be active and to explore.</p>
      <p>A treasure hunt is <strong>a fun and satisfying experience</strong> for children of all ages.</p>
      <h2>What you need for a treasure hunt<a id="what-you-need-for-a-treasure-hunt-nav-title" class="inpage-link-target"></a></h2>
      <h2>What you need for a treasure hunt<a id="what-you-need-for-a-treasure-hunt-nav-title" class="inpage-link-target"></a></h2>
      <p>You can do a treasure hunt anywhere, but <strong>an outdoor space with lots of interesting things</strong> to look at and places to hide things is more fun to explore.</p>
      <p>Here’s what you need for a treasure hunt:</p>
      <ul><li>paper and pencils to prepare the clues in advance</li><li>a ‘treasure’ to hide</li><li>someone to supervise your child while you hide the treasure and clues – for example, someone to take your child for a short walk or play with your child in another area.</li></ul>`,
    },
  });
};
module.exports = { getRules };
