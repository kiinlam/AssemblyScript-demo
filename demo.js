(async () => {
    const importObject = {
        env: {
            abort(_msg, _file, line, column) {
                console.error("abort called at index.ts:" + line + ":" + column);
            }
        }
    };
    const module = await WebAssembly.instantiateStreaming(
        fetch("build/optimized.wasm"),
        importObject
    );
    const add = module.instance.exports.add;

    const result = document.querySelector("#result");
    document.querySelector("#add").addEventListener("submit", event => {
        event.preventDefault();
        result.innerText = "";
        const number = event.target.elements.number.value;
        result.innerText = `${number} + ${number} = ${add(number, number)}.`;
    });
})();

