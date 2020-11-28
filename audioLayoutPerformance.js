const M = 8;

      let i = 0;

      function getI() {
        return i;
      }

      function setI(val) {
        i = val;
      }
      let liveBlocks = [[], [], []];
      const members = []
      for (let i = 0; i < 10; i++) {
        members.push({
          name: `yuhui-${i}`,
          age: 26,
        });
      }

      onMembersChange(members);

      function addMember(pos = 0) {
        const no = parseInt(Math.random()*100);
        console.log(`insert 'yuhui-${no}' at pos ${pos}`);
        members.splice(pos, 0, {name: `yuhui-${no}`, age: 8});

        onMembersChange(members);
      }

      function removeMember(pos) {
        if(isNaN(pos) || pos < 0 || members.length <= pos) {
          console.warn(`removeMember failed: pos ${pos} should be ∈[0, ${members.length})`);
          return;
        }
        console.log(`remove members[${pos}](${members[pos].name})`);
        members.splice(pos, 1);

        onMembersChange(members);
      }

      function onMembersChange(members) {
        const blocks = toBlocks(members);
        const liveBlocks = getWindowBlocks(blocks);

        
      }

      function getWindowBlocks(blocks) {
        const blocksLen = blocks.length;
        if (getI() < 0 || blocksLen <= getI()) {
          if (getI() < 0) {
            throw 'i cannot be 0, how does it happened?';
          }

          console.warn(`window index changed from ${getI()} to ${blocksLen - 1}`);
          setI(blocksLen - 1);
        }

        const i = getI();
        const liveBlocks = [];
        liveBlocks.push(0 <= i - 1 ? blocks[i - 1] : []);
        liveBlocks.push(blocks[i]);
        liveBlocks.push(i + 1 < blocksLen ? blocks[i + 1] : []);

        console.log(`liveBlocks:
        左窗口：[${i-1}](len=${liveBlocks[0].length}
        可见窗口：[${i}](len=${liveBlocks[1].length}
        右窗口：[${i+1}](len=${liveBlocks[2].length}
        `);
        return liveBlocks;
      }

      function toBlocks(members) {
        let blocks = [];
        for (let i = 0, l = members.length; i < l;) {
          const block = [];
          for (let j = 0; j < M && i < l; j++) {
            block.push(members[i++]);
          }
          blocks.push(block);
          console.log(`blocks[${Math.ceil(i / M) - 1}].length = ${block.length}`);
        }
        return blocks;
      }