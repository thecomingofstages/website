// @ts-check

/**
 * Utility file for generating TypeScript AST nodes.
 */
import ts from "typescript";
import { unraw } from "unraw";

const { factory } = ts;

/**
 * Creates a TypeScript AST node for a string literal.
 */
const tsStr = ts.factory.createStringLiteral;

/**
 * Creates a TypeScript AST node for exporting a constant variable.
 * @param {string} name Variable name
 * @param {*} value TypeScript AST node representing the value
 *
 * @example
 * tsExportConst("foo", tsStr("bar"));
 * // Returns: `export const foo = bar`
 */
const tsExportConst = (name, value) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(name),
          undefined,
          undefined,
          value
        ),
      ],
      ts.NodeFlags.Const
    )
  );
};

/**
 * Creates a TypeScript AST node for an object literal.
 * @param {Record<string, ts.Expression>} record An object of TypeScript AST nodes
 * @returns {ts.ObjectLiteralExpression}
 *
 * @example
 * tsObj({
 *  name: tsStr("foo"),
 *  title: tsStr("bar"),
 * });
 * // Returns: `{ name: "foo", title: "bar" }`
 */
const tsObj = (record) => {
  return ts.factory.createObjectLiteralExpression.call(
    undefined,
    Object.entries(record).map(([key, value]) => {
      return ts.factory.createPropertyAssignment(key, value);
    })
  );
};

/**
 * Creates a TypeScript AST node for a function call.
 * @param {string} name Function name
 * @param {ts.Expression[]} args An array of arguments in TypeScript AST node
 *
 * @example
 * tsFunc("require", [tsStr("./foo")]);
 * // Returns: `require("./foo")`
 */
const tsFunc = (name, args) => {
  return ts.factory.createCallExpression(
    ts.factory.createIdentifier(name),
    undefined,
    args
  );
};

/**
 * Wraps a value with `as const` assertion.
 * @param {ts.Expression} value
 * @returns
 */
const tsAsConst = (value) => {
  return ts.factory.createAsExpression(
    value,
    ts.factory.createTypeReferenceNode("const")
  );
};

/**
 * Wraps a value with `satisfies` assertion.
 * @param {ts.Expression} value
 * @param {string} type
 * @returns
 */
const tsSatisfies = (value, type) => {
  return ts.factory.createSatisfiesExpression(
    value,
    ts.factory.createTypeReferenceNode(type)
  );
};

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

/**
 * Returns the TypeScript code from the given TypeScript AST node.
 * @param {ts.Node} node
 * @returns
 */
const tsCodeOutput = (node) => {
  return decodeURIComponent(
    unraw(
      printer.printNode(
        ts.EmitHint.Unspecified,
        node,
        ts.createSourceFile("", "", ts.ScriptTarget.Latest)
      )
    )
  );
};

export {
  tsExportConst,
  tsStr,
  tsObj,
  tsFunc,
  tsAsConst,
  tsSatisfies,
  tsCodeOutput,
};
