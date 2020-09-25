var ComponentsRegistry = /** @class */ (function () {
    function ComponentsRegistry() {
        this.components = {};
    }
    ComponentsRegistry.prototype.register = function (name, Module) {
        if (!this.components[name]) {
            this.components[name] = Module;
        }
    };
    ComponentsRegistry.prototype.get = function (name) {
        if (!this.components[name]) {
            throw new Error("Component " + name + " not exists");
        }
        return this.components[name];
    };
    return ComponentsRegistry;
}());
export { ComponentsRegistry };
