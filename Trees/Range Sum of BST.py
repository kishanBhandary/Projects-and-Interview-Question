'''
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right 
'''    
def rangeSumBST(root, low, high):
    if not root:
        return 0 

    su = 0

    if low <= root.val <= high:
        su += root.val

    su += rangeSumBST(root.left, low, high)
    su += rangeSumBST(root.right, low, high)

    return su
