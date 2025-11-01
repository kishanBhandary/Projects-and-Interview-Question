'''
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right 
'''    

def updateBST(root):
    # Helper function to do reverse in-order traversal
    def reverse_inorder(node):
        nonlocal running_sum
        if not node:
            return

        # Traverse right subtree (greater values)
        reverse_inorder(node.right)

        # Update current node
        running_sum += node.val
        node.val = running_sum

        # Traverse left subtree (smaller values)
        reverse_inorder(node.left)

    running_sum = 0
    reverse_inorder(root)
    return root
