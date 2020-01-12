/**wordsearch.kt
 * A small java program that works as a basic word search generator.
 * Takes in words to be 'hidden' creates and fills array with the words
 * and a mix of random characters to make them harder to find.
 *
 * @author JChase.
 **/
class wordSearch() {
    var width: Int
    var length: Int
    var wordCount: Int
    var words = arrayListOf()
    var badWords = listOf("arse", "ass", "asshole", "bastard", "bitch", "bollocks", "bugger", "crap", "cunt", "damn", "effing", "frigger", "fuck", "hell", "holy shit", "horseshit", "motherfucker", "nigga", "nigger", "prick", "shit", "slut", "twat", "whore")
    var positions: intArray
    var search = arrayOf<Array<Char>>()
    var input: String
    var toUpperCase: Boolean
    /** counter for errors **/
    var errorCount: Int

    /**
     * Prints the finished word search and related information
     */
    fun printVertical() {
        for (list in search) {
            for (entry in list) {
                println("$entry ")
            }
            println(" ")
        }
        println("""done
            |$width     Lines deep
            |$length    Lines wide
            |Find these words""".trimMargin())
    }

    /**
     * Prints output to html page and saves.
     */
    fun printHtml() {

    }

    /**
     * Creates the wordsearch by calling other methods
     */
    fun run() {
        println("""Welcome to the word search generator
            |This simple java program will create a word search based on words you choose""".trimMargin())
        takeInput()
        measurements()
        fill()
    }

    /**
     * Fills up the search array, applies the inputted words, and
     * randomly generates the rest of the characters.
     */
    fun fill() {
        var between: Int
        var strlen: Int
        var x: Int
        var y: Int
        var index: Int = 0
        positions = IntArray(wordCount)

        for (word: String in words) {
            strlen = word.length
            between = width - strlen
            x = Random.nextInt(0, between)
            y = Random.nextInt(0, length - 5)
            if (search(positions, y)) {
                y++
            }
            positions[index] = y
            var idx: Int = 0
            while (idx < strlen) { //for each letter in the word
                search[x][y] = words[index].get(idx) //put char into the search array
                x++
                idx++
            }
            index++
        }

        //fill empty slots
        var idx = 0
        while (idx < length) {
            var i = 0
            while (i < width) {
                val t: Char = Random.nextInt(97, 122).toChar()
                search[idx][i] = t
                i++
            }
            idx++
        }
    }//end of method

    /**
     * @param Int array, Int key.
     *
     * @return boolean. searches array for the key. returns true if key is in array.
     */

    fun search(numbers, key): Boolean {
       for (value in numbers) {
            if (value == key) {
               return true //found it!
           }
        }
        return false
    }

    /**
     * Takes user input, processes it and places it in relevate datafields.
     */
    fun takeInput() {

    }

    /**
     * Calculates size of the char array the word search uses.
     */
    fun measurements() {
        println("enerating word search")
        for (var word: String in words) {
            if (word.length > width) {
                width = word.length
            }
        }
        width *= 2
        length = width + (width / 3)
        search = Array(width, {CharArray(length)})
    }
}