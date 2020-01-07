# 第 10 章 -- DOM

## 本章目录 (Catalog)


## 生词 (New Words)


## 本章内容 (Content)
- DOM (Document Object Model 文档对象模型) 是针对 HTML 和 XML 文档的一个 API (应用
  程序编程接口)。DOM 描绘了一个层次化的节点树，允许开发人员添加、移除 和 修改页面的某一部分。
> 10.1.1 Node 类型
- DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在 js
  中是作为 Node 类型实现的；js 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享
  着相同的基本属性和方法。
- 每个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列
  12 个数值常量来表示，任何接地啊你类型都必居其一:
    + Node.element_node(1);
    + Node.attribute_node(2);
    + Node.text_node(3);
    + Node.cdata_section_node(4);
    + Node.entity_reference_node(5);
    + Node.entity_node(6);
    + Node.processing_instruction_node(7);
    + Node.comment_node(8);
    + Node.document_node(9);
    + Node.document_type_node(10);
    + Node.document_fragment_node(11);
    + Node.notation_node(12); 