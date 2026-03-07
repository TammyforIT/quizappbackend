// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "An account with that email is already created" });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered", user });

  } catch (err) {
    console.error(err);

    // 
    if (err.code === 11000) {
      return res.status(400).json({ error: "An account with that email is already created" });
    }

    res.status(500).json({ error: "Error registering user" });
  }
});
