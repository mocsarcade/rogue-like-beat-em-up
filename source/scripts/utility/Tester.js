export default function Tester(test) {
    try {
        test()
    } catch(error) {
        console.error("A test failed in " + test.name + ":\n    ", error)
    }
}
