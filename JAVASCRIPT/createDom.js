/**
 * The function creates a DOM element based on a given object with type, attributes, and children
 * properties.
 * @param root - The root parameter is an object that represents the root element of the DOM tree that
 * we want to create. It contains information about the element's type, attributes, and children.
 * @returns The `createDom` function returns a DOM element created from the input `root` object.
 */
function createDom(root) {
  const node = document.createElement(root.type);

  if (root.attributes) {
    for (const [attribute, value] of Object.entries(root.attributes)) {
      node.setAttribute(attribute, value);
    }
  }

  if (root.children) {
    for (const child of root.children) {
      node.append(typeof child === "string" ? child : createDom(child));
    }
  }

  return node;
}
