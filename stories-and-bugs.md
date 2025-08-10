# Stories and bugs.

✅ - Done
🔵 - In progress

- ✅ [Story] - As a user I want to be able to send money to banker
- ✅ [Story] - As a banker I want to be able to pass banker to someone else
- ✅ [Bug] - On login, black user is seen as opacity
- ✅ [Story] - As a user I want to be able to know why my transaction failed (validation)
- ✅ [Story] - As a user I want pressing enter to send money
- ✅ [Story] - As a banker, I want to be able to setup predefined amounts for sending money
- ✅ [Story] - As a banker, I want to be able to setup starting money amount
- ✅ [Bug] - Transfer to everyone validates the balance only once.
- ✅ [Bug] - Transfer to banker shows up as "transfer to everyone" in the modal title
- ✅ [Story] - As a user I want to be able to hide my money amount
- ✅ [Story] - As a user I want to have a sound notification when I receive money
- ✅ [Story] - As a user I want my screen to not lock when I use the app
- ✅ [Story] - As a user I want to be able to add optional description to the transaction
- ✅ [Story] - As a user I want to be able to view newest transactions first
- 🔵 [Technical item] - Authentication should use firebase anonymous auth instead of userKey in local storage
  - ✅ Clean up a domain, so that files are better organized
  - ✅ Refactor infrastructure to use providers
  - ✅ Remove singleton pattern from infrastructure for accessing db using higher order functions
  - 🔵 Refactor authentication to use firebase anonymous auth
- 🔵 [Story] - In the lobby banker can kick users
- 🔵 [Story] - user can change their username and color in the lobby and in the game
- 🔵 [Story] - In transfer modal hide description field under button, so that without clicking it, clicking "next" on the keyboard will submit the form
- 🔵 [Story] - As a user I want to view last transaction of mine below balance
- 🔵 [Bug] - When money is sent to all users, only last user has sound notification.
- Might be good oportunity to store transfer to all users as one transaction in database.
- 🔵 [Story] - As a banker I want to see bank balance, to better catch up cheat attempts
- 🔵 [Story] - As a user I want to see who is online
- 🔵 [Story] - As a user I want better visuals
- 🔵 [Story] - Add rules to realtime database
- 🔵 [Bug] -Very long usernames are not displayed correctly
- 🔵 [Story] - As a user I want to be able to change my username and color during the game
- 🔵 [Story] - As a user I want to not be able to set my password to "Banker"
- 🔵 [Bug] - When adding presets in preset modal, they reset when new user joins